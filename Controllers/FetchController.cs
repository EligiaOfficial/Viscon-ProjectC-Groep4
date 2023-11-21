using Microsoft.AspNetCore.Mvc;
using Entities;

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
        
        [HttpGet("TicketData")]
        public async Task<ActionResult<IEnumerable<Machine>>> GetTicketData(int Id) {
            await using var context = _services.GetService<ApplicationDbContext>();
            try {
                var ticket = context?.Tickets.FirstOrDefault(x => x.Tick_Id == Id);
                var department = ticket?.Departments;
                var creator = ticket?.Creator;
                return Ok(new {Ticket = ticket, Departments = department, User = creator});
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
