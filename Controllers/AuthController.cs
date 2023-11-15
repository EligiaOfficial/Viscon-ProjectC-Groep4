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
        private readonly ILogger<AuthController> _logger;
        private readonly IServiceProvider _services;

        public AuthController(IConfiguration configuration, ILogger<AuthController> logger, IServiceProvider services) {
            _configuration = configuration;
            _logger = logger;
            _services = services;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto data) {
            try {
                _logger.LogInformation(data.Email + " is trying to log in.");

                await using var context = _services.GetService<ApplicationDbContext>();
                var user = await context.Users.Where(p => p.Usr_Email == data.Email).FirstOrDefaultAsync();
                if (user == null) {
                    _logger.LogError("User not found");
                    return BadRequest("User not found");
                }

                if (!VerifyPassword(data.Password, user.Usr_Password, user.Usr_PasswSalt)) {
                    _logger.LogError("Wrong Password");
                    return BadRequest("Wrong password");
                }
                _logger.LogInformation("User and Passw correct", data.Password);

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
                _logger.LogInformation(data.FirstName + " " + data.LastName + " is trying to be created");

                CreatePassHash(data.Password, out byte[] passwordHash, out byte[] passwordSalt);

                _logger.LogInformation(data.Password, passwordHash, passwordSalt);

                await using var context = _services.GetService<ApplicationDbContext>();
                var department = await context.Departments.Where(p => p.Dep_Id == data.Department).FirstOrDefaultAsync();
                var company = await context.Companies.Where(p => p.Com_Id == data.Company).FirstOrDefaultAsync();

                if (department == null) return BadRequest("No department found");
                if (company == null) return BadRequest("No company found");
                var user = new User {
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
                    _logger.LogInformation("Created account for user: (" + user.Usr_FirstName + " " + user.Usr_LastName + " " + user.Usr_Email + ")");
                }
                catch (DbUpdateException e) {
                    _logger.LogError(e.ToString());
                    return BadRequest(e.Message);
                }

                return Ok(user);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
        
        private string CreateToken(User user) {

            _logger.LogInformation($"Creating Token for {user.Usr_Email}");

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
                _logger.LogInformation($"Token created successfully. {token}");
                return tokenString;
            } catch (Exception ex) {
                _logger.LogError($"Error creating token: {ex.Message}");
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
