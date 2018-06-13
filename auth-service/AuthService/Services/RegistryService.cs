using System;
using System.Threading.Tasks;
using AuthService.Dtos;
using Microsoft.AspNetCore.Identity;

namespace AuthService.Services
{
    public class RegistryService : IRegistryService
    {
        private UserManager<IdentityUser> _user_manager;

        public RegistryService(UserManager<IdentityUser> user_manager)
        {
            this._user_manager = user_manager;
        }

        public async Task Register(RegistryDto model)
        {
            try
            {
                var user = await _user_manager.FindByNameAsync(model.username);

                if (user == null)
                    user = await _user_manager.FindByEmailAsync(model.email_address);

                if (user == null)
                {
                    user = new IdentityUser
                    {
                        Id = System.Guid.NewGuid().ToString(),
                        UserName = model.username,
                        Email = model.email_address
                    };

                    await _user_manager.CreateAsync(user, model.password);
                    return;
                }
            }
            catch (Exception)
            {
                throw new Exception("Ooopps, a server error has occurred");
            }

            throw new Exception("username and/or email address is already registered");
        }
    }
}