using System;
using System.Text;
using System.Threading.Tasks;
using AuthService.Exceptions;
using AuthService.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace AuthService.Services
{
    public class SignInService : ISignInService
    {
        private UserManager<IdentityUser> _user_manager;

        public SignInService(UserManager<IdentityUser> user_manager)
        {
            this._user_manager = user_manager;
        }

        public async Task<IdentityUser> SignIn(CredentialsDto model)
        {
            try
            {
                var user = await _user_manager.FindByNameAsync(model.identifier);

                if (user == null)
                    user = await _user_manager.FindByEmailAsync(model.identifier);

                if (user == null)
                    throw new SignInException("could not find your account");

                if (await _user_manager.IsLockedOutAsync(user))
                    throw new SignInException("your account is locked out");

                if (!await _user_manager.CheckPasswordAsync(user, model.password))
                    throw new SignInException("invalid credentials");

                // if (!await _user_manager.IsEmailConfirmedAsync(user))
                //     throw new SignInException("your email address is not confirmed");

                return user;
            }
            catch (SignInException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new Exception("Ooopps, a server error has occurred");
            }
        }
    }
}