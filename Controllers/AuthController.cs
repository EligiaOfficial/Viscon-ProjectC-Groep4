using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Viscon_ProjectC_Groep4.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDto data)
        {
            try
            {
                System.Console.WriteLine(data.email + "is trying to log in.");

                using (var context = new ApplicationDbContext())
                {

                    var user = await context.Users.Where(p => p.Usr_Email == data.email).FirstOrDefaultAsync();
                    if (user == null)
                    {
                        return BadRequest("User not found");
                    }

                    if (!VerifyPassword(data.password, user.Usr_Password, user.Usr_PasswSalt))
                    {
                        return BadRequest("Wrong password");
                    }

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(AddDto data)
        {
            try
            {
                System.Console.WriteLine(data.email + " is trying to be created");

                CreatePassHash(data.password, out byte[] passwordHash, out byte[] passwordSalt);

                System.Console.WriteLine(data.password, passwordHash, passwordSalt);

                using (var context = new ApplicationDbContext())
                {
                    var company = await context.Departments.Where(p => p.Dep_Id == 0).FirstOrDefaultAsync();
                    if (company != null) return BadRequest("No company found");
                    var user = new Users
                    {
                        Usr_Id = 1,
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
                        Usr_DepId = 0,
                    };
                    try
                        {
                        context.Users.Add(user);
                        context.SaveChanges();
                        }
                        catch (DbUpdateException e)
                        {
                            System.Console.WriteLine(e);
                        }
                    return Ok(user);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private void CreatePassHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var CalcHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return CalcHash.SequenceEqual(passwordHash);
            }
        }

    }
}
