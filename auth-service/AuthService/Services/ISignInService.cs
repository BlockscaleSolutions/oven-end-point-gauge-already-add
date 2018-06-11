using System.Threading.Tasks;
using AuthService.Dtos;
using Microsoft.AspNetCore.Identity;

namespace AuthService.Services
{
    public interface ISignInService
    {
        Task<IdentityUser> SignIn(CredentialsDto model);
    }
}