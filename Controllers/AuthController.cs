using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Security.Claims;
using Entities;
using Microsoft.IdentityModel.Tokens;

namespace Viscon_ProjectC_Groep4.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration) {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto data) {
            try {
                System.Console.WriteLine(data.email + " is trying to log in.");

                using (var context = new ApplicationDbContext()) {
                    var user = await context.Users.Where(p => p.Usr_Email == data.email).FirstOrDefaultAsync();
                    if (user == null) {
                        System.Console.WriteLine("User not found");
                        return BadRequest("User not found");
                    }

                    if (!VerifyPassword(data.password, user.Usr_Password, user.Usr_PasswSalt)) {
                        System.Console.WriteLine("Wrong Password");
                        return BadRequest("Wrong password");
                    }
                    System.Console.WriteLine("User and Passw correct", data.password);

                    var token = CreateToken(user);
                    
                    return Ok(token);
                }
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(AddDto data) {
            try {
                System.Console.WriteLine(data.email + " is trying to be created");

                CreatePassHash(data.password, out byte[] passwordHash, out byte[] passwordSalt);

                System.Console.WriteLine(data.password, passwordHash, passwordSalt);

                using (var context = new ApplicationDbContext()) {
                    var company = await context.Departments.Where(p => p.Dep_Id == 1).FirstOrDefaultAsync();
                    if (company == null) return BadRequest("No company found");
                    var user = new Entities.Users {
                        Usr_FirstName = "Test",
                        Usr_LastName = "Test",
                        Usr_Email = data.email,
                        Usr_Password = passwordHash,
                        Usr_PasswSalt = passwordSalt,
                        Usr_Level = 0,
                        Usr_Username = "Test",
                        Usr_Role = "Test",
                        Usr_PhoneNumber = 1234,
                        Usr_LanguagePreference = "NL",
                        Usr_DepId = company.Dep_Id,
                    };
                    try {
                        context.Users.Add(user);
                        await context.SaveChangesAsync();
                        System.Console.WriteLine("Created account for user: ", user.Usr_Email);

                    }
                    catch (DbUpdateException e) {
                        System.Console.WriteLine(e);
                    }

                    return Ok(user);
                }
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
        
        private static string CreateToken(Users user) {

            Console.WriteLine($"Creating Token for {user.Usr_Email}");

            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.Usr_Id.ToString()),
                new Claim(ClaimTypes.Name, user.Usr_FirstName + user.Usr_LastName),
                new Claim(ClaimTypes.Email, user.Usr_Email),
                new Claim(ClaimTypes.MobilePhone, user.Usr_PhoneNumber.ToString()),
                new Claim(ClaimTypes.Role, user.Usr_Role.ToString()),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8
                .GetBytes("aSlOdjn0gJKhZBerB9oPDiCxQ7h5aRmYyNX94ytbxC7HJmq109VREMVAJW+dpKpSbZZryJPbHgX7jpy6bLvy0Iw="));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            
            try {
                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

                var tokenHandler = new JwtSecurityTokenHandler();
                string tokenString = tokenHandler.WriteToken(token);
                Console.WriteLine($"Token created successfully. {token}");
                return tokenString;
            } catch (Exception ex) {
                Console.WriteLine($"Error creating token: {ex.Message}");
                return null; // Return null or handle the error as needed
            }
            
        }

        private string VerifyToken() {
            return "";
        }

        private void CreatePassHash(string password, out byte[] passwordHash, out byte[] passwordSalt) {
            using (var hmac = new HMACSHA512()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt) {
            using (var hmac = new HMACSHA512(passwordSalt)) {
                var CalcHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return CalcHash.SequenceEqual(passwordHash);
            }
        }
    }
}