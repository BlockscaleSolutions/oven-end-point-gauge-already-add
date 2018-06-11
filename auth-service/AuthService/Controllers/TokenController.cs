using System;
using System.Threading.Tasks;
using AuthService.Exceptions;
using AuthService.Models;
using AuthService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{

    [ApiController]
    [Route("api/sign-in")]
    public class TokenController : ControllerBase
    {
        private ISignInService _signin_service;
        private ITokenService _token_service;

        public TokenController(
            ISignInService signin_service,
            ITokenService token_service
        )
        {
            this._signin_service = signin_service;
            this._token_service = token_service;
        }

        [HttpPost]
        public async Task<IActionResult> SignIn(CredentialsModel model)
        {
            if (ModelState.IsValid)
                try
                {
                    var user = await _signin_service.SignIn(model);
                    return Ok(_token_service.Generate(user));
                }
                catch (SignInException ex)
                {
                    ModelState.AddModelError("", ex.Message);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }

            return BadRequest();
        }
    }
}