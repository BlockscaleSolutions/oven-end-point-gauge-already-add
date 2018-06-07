using System.Threading.Tasks;
using AuthService.Models;
using Microsoft.AspNetCore.Identity;

namespace AuthService.Services
{
    public class RegistryService
    {
        private UserManager<IdentityUser> _user_manager;

        public RegistryService(UserManager<IdentityUser> user_manager)
        {
            this._user_manager = user_manager;
        }

        public async Task Register(RegistryModel model)
        {
            var user = await _user_manager.FindByNameAsync(model.username);

            if (user == null)
                user = await _user_manager.FindByEmailAsync(model.email_address);

            if (user == null)
            {
                user = new IdentityUser
                {
                    Id = System.Guid.NewGuid().ToString(),
                    UserName = model.username
                };

                await _user_manager.CreateAsync(user, model.password);
            }

            throw new System.Exception();
        }
    }
}