using System;
using System.Threading.Tasks;
using AuthService.Models;
using AuthService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistryController : ControllerBase
    {
        private readonly IRegistryService _registry_service;

        public RegistryController(IRegistryService registry_service)
        {
            this._registry_service = registry_service;
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegistryModel model)
        {
            if (ModelState.IsValid)
                try
                {
                    await _registry_service.Register(model);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }

            return BadRequest();
        }
    }
}
