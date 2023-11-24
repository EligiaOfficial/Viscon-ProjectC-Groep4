using System.Runtime.Intrinsics.Arm;
using Microsoft.AspNetCore.Mvc;
using Entities;
using Viscon_ProjectC_Groep4.Dto;

namespace Viscon_ProjectC_Groep4.Controllers {
    
    [ApiController]
    [Route("[controller]")]
    public class FetchController : ControllerBase {
        
        private readonly IServiceProvider _services;

        public FetchController(IConfiguration configuration, IServiceProvider services) {
            _services = services;
        }
        
        [HttpGet("AccountData")]
        public async Task<ActionResult<IEnumerable<Machine>>> GetData() {
            await using var context = _services.GetService<ApplicationDbContext>();
            try {
                var department = context?.Departments.ToList();
                var company = context?.Companies.ToList();
                return Ok(new {Companies = company, Departments = department});
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
        
        [HttpPost("UserName")]
        public async Task<IActionResult> GetUser(getUserDto data) {
            await using var context = _services.GetService<ApplicationDbContext>();
            try {
                var user = context.Users.FirstOrDefault(_ => _.Id == data.Id);
                return Ok(user.FirstName + " " + user.LastName);
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
