/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */

using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Viscon_ProjectC_Groep4.Dto;

namespace Viscon_ProjectC_Groep4.Services.AuthService
{
    public class AuthServices : ControllerBase, IAuthServices
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthServices> _logger;
        private readonly Authenticator _authenticator;
        private readonly ApplicationDbContext _dbContext;

        public AuthServices(
            IConfiguration configuration, ILogger<AuthServices> logger,
            Authenticator authenticator, ApplicationDbContext dbContext
        )
        {
            _configuration = configuration;
            _logger = logger;
            _authenticator = authenticator;
            _dbContext = dbContext;
        }

        public async Task<IActionResult> Edit(EditDto data)
        {
            string? _id = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (_id is null) return BadRequest();
            int id = Int32.Parse(_id);

            var user = await _dbContext!.Users
                .Where(u => u.Id == id)
                .FirstOrDefaultAsync();

            if (user == null) return BadRequest();

            if (data.Password != string.Empty)
            {
                Authenticator.CreatePassHash(
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

        public async Task<IActionResult> Login(LoginDto data)
        {
            _logger.LogInformation(data.Email + " is trying to log in.");
            var user = await _dbContext.Users.Where(p => p.Email == data.Email).FirstOrDefaultAsync();
            if (user == null)
            {
                _logger.LogError("User not found");
                return BadRequest("User not found");
            }

            if (!Authenticator.VerifyPassword(
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

        public async Task<IActionResult> Add(AddDto data)
        {
            _logger.LogInformation(data.FirstName + " " + data.LastName + " is trying to be created");

            Authenticator.CreatePassHash(
                data.Password, out byte[] passwordHash, out byte[] passwordSalt
            );

            _logger.LogInformation(data.Password, passwordHash, passwordSalt);

            var department = await _dbContext.Departments.Where(p => p.Id == data.Department).FirstOrDefaultAsync();
            var company = await _dbContext.Companies.Where(p => p.Id == data.Company).FirstOrDefaultAsync();
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
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            _logger.LogInformation("Created account for user: (" + user.FirstName + " " + user.LastName + " " +
                                   user.Email + ")");
            return Ok("Success");
        }

        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            // Check if the provided email exists in your database
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == request.Email);

            if (user == null)
            {
                // User with the provided email does not exist
                return BadRequest("User not found");
            }

            // Generate a unique token for this reset request (e.g., a GUID)
            var token = Guid.NewGuid().ToString();

            // Set the token expiration time (e.g., 2 hours from now)
            var tokenExpiration = DateTime.UtcNow.AddHours(2);

            // Store the token and its expiration time in your ForgotPasswords table
            var forgotPasswordEntry = new Entities.ForgottenPassword

            {
                FP_Id = _dbContext.Users.Where(u => u.Email == request.Email).Select(u => u.Id).FirstOrDefault(),
                FP_Token = token,
                FP_Expire = tokenExpiration
            };

            _dbContext.ForgottenPasswords.Add(forgotPasswordEntry);
            await _dbContext.SaveChangesAsync();


            var resetLink = $"http://localhost:5173/reset-password?token={token}";

            var mailMessage = new MailMessage
            {
                From = new MailAddress("visconticketsystemhelp@gmail.com"),
                Subject = "Password Reset Request",
                Body = $"Click the following link to reset your password: {resetLink}",
                IsBodyHtml = true,
            };
            mailMessage.To.Add(request.Email);

            using (var smtpClient = new SmtpClient("smtp.gmail.com"))
            {
                smtpClient.Port = 587;
                smtpClient.Credentials =
                    new NetworkCredential("visconticketsystemhelp@gmail.com", "gcph mqwe csfx oxdj ");
                smtpClient.EnableSsl = true;

                await smtpClient.SendMailAsync(mailMessage);
            }

            return Ok();
        }
        
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            // Retrieve the entry from your ForgottenPasswords table using the provided token
            var forgotPasswordEntry = _dbContext.ForgottenPasswords.FirstOrDefault(f => f.FP_Token == request.Token && f.FP_Expire > DateTime.UtcNow);

            if (forgotPasswordEntry == null)
            {
                return BadRequest("Invalid or expired token");
            }

            // Retrieve the user using the FP_Id
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == forgotPasswordEntry.FP_Id);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            Authenticator.CreatePassHash(
                request.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);
            // Update the user's password
            user.Password = passwordHash; // Ensure you hash the password
            user.PasswSalt = passwordSalt;

            // Save changes to the database
            await _dbContext.SaveChangesAsync();

            // Optional: Invalidate the token after successful password reset

            return Ok("Password reset successfully");
        }
    }
}