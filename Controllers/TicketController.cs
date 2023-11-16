using Microsoft.AspNetCore.Mvc;
using static Viscon_ProjectC_Groep4.Controllers.AuthController;
using Entities; // Make sure this namespace exists
using Viscon_ProjectC_Groep4.Dto;

namespace Viscon_ProjectC_Groep4.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ILogger<TicketController> _logger;
        private readonly IServiceProvider _services;

        public TicketController(ILogger<TicketController> logger, IServiceProvider services) {
            _logger = logger;
            _services = services;
        }
            
            
        [HttpPost("createticket")]
        public async Task<ActionResult<Ticket>> CreateTicket([FromBody] MachineDataDto data) {
            _logger.LogInformation("API Fetched");
            await using var context = _services.GetService<ApplicationDbContext>();
            try {
                if (VerifyToken(data.Jtw, out int Id)) {
                    _logger.LogInformation("Token Correct");
                    var ticket = new Ticket();
                    ticket.Tick_MachId = context.Machines.Where(m => m.Mach_Name == data.machine).Select(m => m.Mach_Id).FirstOrDefault();
                    ticket.Tick_Title = $"{DateTime.UtcNow} Prio: {data.priority}, {data.machine}";
                    ticket.Tick_Description = data.description;
                    ticket.Tick_DateCreated = DateTime.UtcNow;
                    ticket.Tick_Priority = int.Parse(data.priority);
                    ticket.Tick_ExpectedToBeDone = data.expectedAction;
                    ticket.Tick_MadeAnyChanges = data.selfTinkering;
                    ticket.Tick_DepartmentId = data.departmentId;
                    ticket.Tick_Creator_UserId = Id;
                    // ticket.Tick_Helper_UserId = null;
                    // ticket.Tick_Media = null;
                    ticket.Tick_Resolved = false;
                    context.Tickets.Add(ticket);
                    context.SaveChanges();
                    return Ok(ticket);
                }
                else {
                    _logger.LogError("Token Error");
                    return Unauthorized("Invalid Token");
                }
            }
            catch (Exception ex)
            {
                System.Console.WriteLine("Catch Run");
                if (ex.InnerException != null)
                {
                    // Log or print the inner exception message
                    _logger.LogError("Inner Exception: " + ex.InnerException.Message);
                }
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
