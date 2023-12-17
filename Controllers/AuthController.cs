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
using ModelBinding;

namespace Viscon_ProjectC_Groep4.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;
        private readonly Authenticator _authenticator;
        private readonly ApplicationDbContext _dbContext;

        public AuthController(
            IConfiguration configuration, ILogger<AuthController> logger,
            Authenticator authenticator, ApplicationDbContext dbContext
        ) {
            _configuration = configuration;
            _logger = logger;
            _authenticator = authenticator;
            _dbContext = dbContext;
        }

        [Authorize(Policy = "user")]
        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> Edit(
            EditDto data, [FromClaim(Name = ClaimTypes.NameIdentifier)] int uid
        )
        {
            var user = await _dbContext!.Users
                .Where(u => u.Id == uid)
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

            await _dbContext.SaveChangesAsync();
            var token = _authenticator.CreateToken(user);
            return Ok(token);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto data)
        {
            _logger.LogInformation(data.Email + " is trying to log in.");
            var user = await _dbContext.Users.Where(p => p.Email == data.Email).FirstOrDefaultAsync();
            if (user == null) {
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

            var department = await _dbContext.Departments.Where(p => p.Id == data.Department).FirstOrDefaultAsync();
            var company = await _dbContext.Companies.Where(p => p.Id == data.Company).FirstOrDefaultAsync();
            var user = new User {
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
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            _logger.LogInformation("Created account for user: (" + user.FirstName + " " + user.LastName + " " +
                                   user.Email + ")");
            return Ok("Success");
        }
    }
}
