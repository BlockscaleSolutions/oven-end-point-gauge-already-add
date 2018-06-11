using Microsoft.AspNetCore.Identity;

namespace AuthService.Services
{
    public interface ITokenService
    {
        string Generate(IdentityUser user);
    }
}