using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Service.Configurations;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace BarberApp.Service.Service
{
    public class TokenService : ITokenService
    {
        private readonly TokenConfiguration _configuration;

        public TokenService(TokenConfiguration tokenConfigurations)
        {
            _configuration = tokenConfigurations;
        }
        public string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim("Email", user.Email.ToString()),
                    new Claim("UserId", user.UserId.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Aud, _configuration.Audience),
                    new Claim(JwtRegisteredClaimNames.Iss, _configuration.Issuer)
                }),
                Expires = DateTime.UtcNow.AddDays(_configuration.TimeToExpiry),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        public string GenerateTokenBarber(Barber barber)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim("UserId", barber.UserId.ToString()),
                    new Claim("BarberId", barber.BarberId.ToString()),
                    new Claim("Email", barber.Email.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Aud, _configuration.Audience),
                    new Claim(JwtRegisteredClaimNames.Iss, _configuration.Issuer)
                }),
                Expires = DateTime.UtcNow.AddDays(_configuration.TimeToExpiry),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
