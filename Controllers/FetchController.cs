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
        
        [HttpPost("TicketData")]
        public async Task<ActionResult> GetTicketData(fetchDto data) {
            await using var context = _services.GetService<ApplicationDbContext>();
            try {
                var ticket = context!.Tickets.FirstOrDefault(x => x.Id == data.Id);
                var department = context.Departments.FirstOrDefault(_ => _.Id == ticket.Id);
                var machine = context.Machines.FirstOrDefault(_ => _.Id == ticket.MachineId);
                var creator = context.Users.FirstOrDefault(_ => _.Id == ticket.CreatorUserId);
                var company = context.Companies.FirstOrDefault(_ => _.Id == creator.CompanyId);
                var helper = context.Users.FirstOrDefault(_ => _.Id == ticket.HelperUserId);
                var messages = context.Messages.Where(_ => _.TicketId == ticket.Id).ToList();
                
                return Ok(new {Ticket = ticket, Department = department, User = creator, Helper = helper, Company = company, Machine = machine, Messages = messages});
            }
            catch (Exception ex) {
                Console.WriteLine("Catched");
                return StatusCode(500, ex.Message);
            }
        }
        
    }
}
