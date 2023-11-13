/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Entities;
using Microsoft.IdentityModel.Tokens;
using Viscon_ProjectC_Groep4.Dto;

namespace Viscon_ProjectC_Groep4.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase {
        private readonly IConfiguration _configuration;
        private readonly IServiceProvider _services;

        public AuthController(IConfiguration configuration, IServiceProvider services) {
            _configuration = configuration;
            _services = services;
        }

        [HttpPost]
        [Route("Edit")]
        public async Task<IActionResult> Edit(EditDto data) {
            if (VerifyToken(data.Jtw, out int Id)) {
                try {
                    await using var context = _services.GetService<ApplicationDbContext>();
                    var user = await context!.Users
                        .Where(u => u.Usr_Id == Id)
                        .FirstOrDefaultAsync();

                    if (user == null) return BadRequest();
                    
                    if (data.Password != string.Empty) {
                        CreatePassHash(data.Password, out byte[] passwordHash, out byte[] passwordSalt);
                        user.Usr_Password = passwordHash;
                        user.Usr_PasswSalt = passwordSalt;
                    }

                    if (data.Email != string.Empty) {
                        user.Usr_Email = data.Email;
                    }

                    if (data.Phone != 0) {
                        user.Usr_PhoneNumber = data.Phone;
                    }

                    if (data.Language != string.Empty) {
                        user.Usr_LanguagePreference = data.Language;
                    }

                    await context.SaveChangesAsync();
                    var token = CreateToken(user);
                    return Ok(token);
                }
                catch (Exception ex) {
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto data) {
            try {
                System.Console.WriteLine(data.Email + " is trying to log in.");

                await using var context = _services.GetService<ApplicationDbContext>();
                var user = await context.Users.Where(p => p.Usr_Email == data.Email).FirstOrDefaultAsync();
                if (user == null) {
                    System.Console.WriteLine("User not found");
                    return BadRequest("User not found");
                }

                if (!VerifyPassword(data.Password, user.Usr_Password, user.Usr_PasswSalt)) {
                    System.Console.WriteLine("Wrong Password");
                    return BadRequest("Wrong password");
                }
                System.Console.WriteLine("User and Passw correct", data.Password);

                var token = CreateToken(user);
                    
                return Ok(token);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(AddDto data) {
            try {
                System.Console.WriteLine(data.FirstName + " " + data.LastName + " is trying to be created");

                CreatePassHash(data.Password, out byte[] passwordHash, out byte[] passwordSalt);

                System.Console.WriteLine(data.Password, passwordHash, passwordSalt);

                await using var context = _services.GetService<ApplicationDbContext>();
                var department = await context.Departments.Where(p => p.Dep_Id == data.Department).FirstOrDefaultAsync();
                var company = await context.Companies.Where(p => p.Com_Id == data.Company).FirstOrDefaultAsync();
                    
                if (company == null) return BadRequest("No company found");
                var user = new Users {
                    Usr_FirstName = data.FirstName,
                    Usr_LastName = data.LastName,
                    Usr_Email = data.Email,
                    Usr_Password = passwordHash,
                    Usr_PasswSalt = passwordSalt,
                    Usr_Role = data.Role,
                    Usr_PhoneNumber = data.Phone,
                    Usr_LanguagePreference = data.Language,
                    Usr_DepId = department.Dep_Id,
                    Usr_CompId = company.Com_Id,
                };
                try {
                    context.Users.Add(user);
                    await context.SaveChangesAsync();
                    Console.WriteLine("Created account for user: (" + user.Usr_FirstName + " " + user.Usr_LastName + " " + user.Usr_Email + ")");
                }
                catch (DbUpdateException e) {
                    System.Console.WriteLine(e);
                }

                return Ok("Success");
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
        
        private static string CreateToken(Users user) {

            Console.WriteLine($"Creating Token for {user.Usr_Email}");

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
                return null!;
            }
            
        }

        public static bool VerifyToken(string token, out int Id) {
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
