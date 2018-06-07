using System;
using System.Threading.Tasks;
using AuthService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistryController : ControllerBase
    {
        private UserManager<IdentityUser> _user_manager;

        public RegistryController(UserManager<IdentityUser> user_manager)
        {
            this._user_manager = user_manager;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegistryModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _user_manager.FindByNameAsync(model.username);
                if (user == null)
                {
                    user = new IdentityUser
                    {
                        Id = Guid.NewGuid().ToString(),
                        UserName = model.username
                    };

                    await _user_manager.CreateAsync(user, model.password);
                    return Ok();
                }
                return BadRequest("username already exists");
            }
            return BadRequest();
        }
    }
}
