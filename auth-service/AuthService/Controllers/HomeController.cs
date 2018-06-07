using System;
using System.Threading.Tasks;
using AuthService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    [Route("")]
    public class HomeController : Controller
    {
        private UserManager<IdentityUser> _user_manager;

        public HomeController(UserManager<IdentityUser> user_manager)
        {
            this._user_manager = user_manager;
        }

        public IActionResult Index()
        {
            var username = TempData["username"];

            if (username == null)
                return Content("hello world!");

            return Content($"hello {username}!");
        }

        [Route("register")]
        public IActionResult Register()
        {
            return View();
        }

        [Route("register")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegistryModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _user_manager.FindByNameAsync(model.username);

                if (user == null)
                    user = await _user_manager.FindByEmailAsync(model.email_address);

                if (user == null)
                {
                    user = new IdentityUser
                    {
                        Id = Guid.NewGuid().ToString(),
                        UserName = model.username
                    };

                    await _user_manager.CreateAsync(user, model.password);

                    TempData["username"] = model.username;
                    return this.RedirectToAction("index");
                }

                ModelState.AddModelError("", "username and/or email address is already registered");
                return View();
            }

            return View();
        }
    }
}