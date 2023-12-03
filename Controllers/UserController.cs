
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
        private readonly ILogger<TicketController> _logger;
        private readonly Authenticator _authenticator;
        private readonly IServiceProvider _services;
        private readonly ApplicationDbContext _context;
        private readonly DbSet<User> _user;

        public UserController(
            ILogger<TicketController> logger, Authenticator authenticator,
            IServiceProvider services, ApplicationDbContext context
        )
        {
            _logger = logger;
            _authenticator = authenticator;
            _services = services;
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
                    Role = _user.Where(user => user.Id == (int)result.Role).Select(role => role.FirstName + " " + role.LastName).FirstOrDefault() ?? "N/A"
                })
                .FirstOrDefaultAsync();
            return Ok(user);
        }
    }
}