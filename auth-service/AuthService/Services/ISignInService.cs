using System.Threading.Tasks;
using AuthService.Models;
using Microsoft.AspNetCore.Identity;

namespace AuthService.Services
{
    public interface ISignInService
    {
        Task<IdentityUser> SignIn(CredentialsModel model);
    }
}