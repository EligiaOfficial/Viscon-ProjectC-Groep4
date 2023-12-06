// AuthController.cs
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

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
    public class PasswordController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;
        private readonly Authenticator _authenticator;
        private readonly IServiceProvider _services;

        public PasswordController(
            IConfiguration configuration, ILogger<AuthController> logger,
            Authenticator authenticator, IServiceProvider services
        )
        {
            _configuration = configuration;
            _logger = logger;
            _authenticator = authenticator;
            _services = services;
        }

        [HttpPost]
        [Route("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            await using var _context = _services.GetService<ApplicationDbContext>();
            // Check if the provided email exists in your database
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);

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
                FP_Id = _context.Users.Where(u => u.Email == request.Email).Select(u => u.Id).FirstOrDefault(),
                FP_Token = token,
                FP_Expire = tokenExpiration

            };

            _context.ForgottenPasswords.Add(forgotPasswordEntry);
            await _context.SaveChangesAsync();


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
                smtpClient.Credentials = new NetworkCredential("visconticketsystemhelp@gmail.com", "gcph mqwe csfx oxdj ");
                smtpClient.EnableSsl = true;

                await smtpClient.SendMailAsync(mailMessage);
            }

            return Ok();
        }


        [HttpPost]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            await using var _context = _services.GetService<ApplicationDbContext>();
            // Retrieve the entry from your ForgottenPasswords table using the provided token
            var forgotPasswordEntry = _context.ForgottenPasswords.FirstOrDefault(f => f.FP_Token == request.Token && f.FP_Expire > DateTime.UtcNow);

            if (forgotPasswordEntry == null)
            {
                return BadRequest("Invalid or expired token");
            }

            // Retrieve the user using the FP_Id
            var user = _context.Users.FirstOrDefault(u => u.Id == forgotPasswordEntry.FP_Id);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            _authenticator.CreatePassHash(
                request.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);
            // Update the user's password
            user.Password = passwordHash; // Ensure you hash the password
            user.PasswSalt = passwordSalt;

            // Save changes to the database
            _context.SaveChanges();

            // Optional: Invalidate the token after successful password reset

            return Ok("Password reset successfully");
        }
        public class ResetPasswordRequest
        {
            public string Token { get; set; }
            public string NewPassword { get; set; }
        }


        public class ForgotPasswordRequest
        {
            public string Email { get; set; }
        }
    }
}
