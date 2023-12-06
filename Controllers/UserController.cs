
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Entities;
using Microsoft.EntityFrameworkCore; // Make sure this namespace exists
using Services;
using Viscon_ProjectC_Groep4.Dto;

namespace Viscon_ProjectC_Groep4.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<User> _user;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
            _user = context.Set<User>();
        }

        [HttpGet]
        [Route("userdata")]
        public async Task<IActionResult> GetUser([FromQuery] int id)
        {
            UserDto? user = await _user
                .Where(user => user.Id == id)
                .Select(result => new UserDto
                {
                    FirstName = result.FirstName,
                    LastName = result.LastName,
                    Email = result.Email,
                    Role = result.Role.ToString() ?? "N/A"
                })
                .FirstOrDefaultAsync();
            return Ok(user);
        }
    }
}
