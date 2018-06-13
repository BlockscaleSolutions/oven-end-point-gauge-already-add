using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AuthService.Services
{
    public class TokenService : ITokenService
    {
        private IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public string Generate(IdentityUser user)
        {
            var now = DateTime.UtcNow;
            var pk = _configuration.GetSection("JWT")["pk"];
            var allotted_minutes = Int16.Parse(_configuration.GetSection("JWT")["AllottedMinutes"]);

            var bytes = Encoding.UTF8.GetBytes(pk);
            var key = new SymmetricSecurityKey(bytes);
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var claims = new HashSet<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, user.UserName));

            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = now.AddMinutes(allotted_minutes),
                SigningCredentials = credentials,
                Issuer = _configuration.GetSection("JWT")["issuer"],
                Audience = _configuration.GetSection("JWT")["audience"]
            };

            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(descriptor);
            return handler.WriteToken(token);
        }
    }
}