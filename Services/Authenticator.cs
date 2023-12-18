using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Entities;
using Microsoft.IdentityModel.Tokens;

namespace Viscon_ProjectC_Groep4.Services;

public class Authenticator {
    public string CreateToken(User user) {
        List<Claim> claims = new List<Claim> {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.FirstName),
            new Claim(ClaimTypes.Name, user.LastName),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.MobilePhone, user.PhoneNumber.ToString()),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim("DepartmentId", user.DepartmentId.ToString()),
            new Claim("CompanyId", user.CompanyId.ToString()),
            new Claim("Lang", user.LanguagePreference),
        };

        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8
            .GetBytes("aSlOdjn0gJKhZBerB9oPDiCxQ7h5aRmYyNX94ytbxC7HJmq109VREMVAJW+dpKpSbZZryJPbHgX7jpy6bLvy0Iw="));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds
        );

        var tokenHandler = new JwtSecurityTokenHandler();
        string tokenString = tokenHandler.WriteToken(token);
        return tokenString;
    }

    public static void CreatePassHash(
        string password, out byte[] passwordHash, out byte[] passwordSalt
    )
    {
        using var hmac = new HMACSHA512();
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
    }

    public static bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512(passwordSalt);
        var CalcHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        return CalcHash.SequenceEqual(passwordHash);
    }

    public bool VerifyToken(string token, out int Id) {
        Id = 0;

        var pre = new JwtSecurityTokenHandler();
        var jwt = pre.ReadJwtToken(token);
        
        if (jwt == null || jwt.ValidFrom > DateTime.UtcNow || jwt.ValidTo < DateTime.UtcNow) {
            return false;
        }

        var claim = jwt.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
        Id = Int32.Parse(claim);
        return true;
    }

}
