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
        
        [HttpPost("TicketData")]
        public async Task<ActionResult> GetTicketData(fetchDto data) {
            Console.WriteLine(data.Id);
            await using var context = _services.GetService<ApplicationDbContext>();
            try {
                var ticket = context!.Tickets.FirstOrDefault(x => x.Tick_Id == 1);
                var department = context.Departments.FirstOrDefault(_ => _.Dep_Id == ticket.Tick_DepartmentId);
                var creator = context.Users.FirstOrDefault(_ => _.Usr_Id == ticket.Tick_Creator_UserId);
                return Ok(new {Ticket = ticket, Department = department, User = creator});
            }
            catch (Exception ex) {
                Console.WriteLine("Catched");
                return StatusCode(500, ex.Message);
            }
        }
        
    }
}
