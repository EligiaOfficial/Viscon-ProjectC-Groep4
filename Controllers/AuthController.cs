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
using Services;

namespace Viscon_ProjectC_Groep4.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase {
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;
        private readonly Authenticator _authenticator;
        private readonly IServiceProvider _services;

        public AuthController(
            IConfiguration configuration, ILogger<AuthController> logger,
            Authenticator authenticator, IServiceProvider services
        ) {
            _configuration = configuration;
            _logger = logger;
            _authenticator = authenticator;
            _services = services;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto data) {
            try {
                _logger.LogInformation(data.Email + " is trying to log in.");

                await using var context = _services.GetService<ApplicationDbContext>();
                var user = await context.Users.Where(p => p.Email == data.Email).FirstOrDefaultAsync();
                if (user == null) {
                    _logger.LogError("User not found");
                    return BadRequest("User not found");
                }

                if (!_authenticator.VerifyPassword(
                    data.Password, user.Password, user.PasswSalt
                )) {
                    _logger.LogError("Wrong Password");
                    return BadRequest("Wrong password");
                }
                _logger.LogInformation("User and Passw correct", data.Password);

                _logger.LogInformation("Creating user token");
                var token = _authenticator.CreateToken(user);

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

                _authenticator.CreatePassHash(
                    data.Password, out byte[] passwordHash, out byte[] passwordSalt
                );

                _logger.LogInformation(data.Password, passwordHash, passwordSalt);

                await using var context = _services.GetService<ApplicationDbContext>();
                var department = await context.Departments.Where(p => p.Id == data.Department).FirstOrDefaultAsync();
                var company = await context.Companies.Where(p => p.Id == data.Company).FirstOrDefaultAsync();

                if (department == null) return BadRequest("No department found");
                if (company == null) return BadRequest("No company found");
                var user = new User {
                    FirstName = data.FirstName,
                    LastName = data.LastName,
                    Email = data.Email,
                    Password = passwordHash,
                    PasswSalt = passwordSalt,
                    Role = (RoleTypes)data.Role,
                    PhoneNumber = data.Phone,
                    LanguagePreference = data.Language,
                    DepartmentId = department.Id,
                    CompanyId = company.Id,
                };
                try {
                    context.Users.Add(user);
                    await context.SaveChangesAsync();
                    _logger.LogInformation("Created account for user: (" + user.FirstName + " " + user.LastName + " " + user.Email + ")");
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
    }
}
