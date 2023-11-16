namespace Services;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Entities;

public class Authenticator {
    public string CreateToken(User user) {
        List<Claim> claims = new List<Claim> {
            new Claim(ClaimTypes.NameIdentifier, user.Usr_Id.ToString()),
            new Claim(ClaimTypes.Name, user.Usr_FirstName),
            new Claim(ClaimTypes.Name, user.Usr_LastName),
            new Claim(ClaimTypes.Email, user.Usr_Email),
            new Claim(ClaimTypes.MobilePhone, user.Usr_PhoneNumber.ToString()),
            new Claim(ClaimTypes.Role, user.Usr_Role.ToString()),
            new Claim("DepartmentId", user.Usr_DepId.ToString()),
            new Claim("CompanyId", user.Usr_CompId.ToString()),
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

    public void CreatePassHash(
        string password, out byte[] passwordHash, out byte[] passwordSalt
    ) {
        using (var hmac = new HMACSHA512()) {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

    public bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt) {
        using (var hmac = new HMACSHA512(passwordSalt)) {
            var CalcHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return CalcHash.SequenceEqual(passwordHash);
        }
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
