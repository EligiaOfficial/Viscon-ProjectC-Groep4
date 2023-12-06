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
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Viscon_ProjectC_Groep4.Dto;
using Services;

namespace Viscon_ProjectC_Groep4.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;
        private readonly Authenticator _authenticator;
        private readonly IServiceProvider _services;

        public AuthController(
            IConfiguration configuration, ILogger<AuthController> logger,
            Authenticator authenticator, IServiceProvider services
        )
        {
            _configuration = configuration;
            _logger = logger;
            _authenticator = authenticator;
            _services = services;
        }

        [Authorize(Policy = "user")]
        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> Edit(EditDto data)
        {
            string? _id = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (_id is null) return BadRequest();
            int id = Int32.Parse(_id);

            await using var context = _services.GetService<ApplicationDbContext>();
            var user = await context!.Users
                .Where(u => u.Id == id)
                .FirstOrDefaultAsync();

            if (user == null) return BadRequest();

            if (data.Password != string.Empty)
            {
                _authenticator.CreatePassHash(
                    data.Password, out byte[] passwordHash, out byte[] passwordSalt
                );
                user.Password = passwordHash;
                user.PasswSalt = passwordSalt;
            }

            if (data.Email != string.Empty)
            {
                user.Email = data.Email;
            }

            if (data.Phone != string.Empty)
            {
                user.PhoneNumber = data.Phone;
            }

            if (data.Language != string.Empty)
            {
                user.LanguagePreference = data.Language;
            }

            await context.SaveChangesAsync();
            var token = _authenticator.CreateToken(user);
            return Ok(token);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto data)
        {
            _logger.LogInformation(data.Email + " is trying to log in.");
            await using var context = _services.GetService<ApplicationDbContext>();
            var user = await context.Users.Where(p => p.Email == data.Email).FirstOrDefaultAsync();
            if (user == null)
            {
                _logger.LogError("User not found");
                return BadRequest("User not found");
            }

            if (!_authenticator.VerifyPassword(
                    data.Password, user.Password, user.PasswSalt
                ))
            {
                _logger.LogError("Wrong Password");
                return BadRequest("Wrong password");
            }

            _logger.LogInformation("User and Passw correct", data.Password);

            _logger.LogInformation("Creating user token");
            var token = _authenticator.CreateToken(user);

            return Ok(token);
        }

        [Authorize(Policy = "key_user")]
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(AddDto data)
        {
            _logger.LogInformation(data.FirstName + " " + data.LastName + " is trying to be created");

            _authenticator.CreatePassHash(
                data.Password, out byte[] passwordHash, out byte[] passwordSalt
            );

            _logger.LogInformation(data.Password, passwordHash, passwordSalt);

            await using var context = _services.GetService<ApplicationDbContext>();
            var department = await context.Departments.Where(p => p.Id == data.Department).FirstOrDefaultAsync();
            var company = await context.Companies.Where(p => p.Id == data.Company).FirstOrDefaultAsync();
            var user = new User
            {
                FirstName = data.FirstName,
                LastName = data.LastName,
                Email = data.Email,
                Password = passwordHash,
                PasswSalt = passwordSalt,
                Role = (RoleTypes)data.Role,
                PhoneNumber = data.Phone,
                LanguagePreference = data.Language,
                DepartmentId = department?.Id,
                CompanyId = company?.Id,
            };
            Console.WriteLine(user.ToString());
            Console.WriteLine(user.Role);
            context.Users.Add(user);
            await context.SaveChangesAsync();
            _logger.LogInformation("Created account for user: (" + user.FirstName + " " + user.LastName + " " +
                                   user.Email + ")");

            return Ok("Success");
        }
    }
}
