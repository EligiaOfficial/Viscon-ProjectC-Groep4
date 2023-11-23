using Microsoft.AspNetCore.Mvc;
using Entities; // Make sure this namespace exists
using Services;
using Viscon_ProjectC_Groep4.Dto;

namespace Viscon_ProjectC_Groep4.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ILogger<TicketController> _logger;
        private readonly Authenticator _authenticator;
        private readonly IServiceProvider _services;

        public TicketController(
            ILogger<TicketController> logger, Authenticator authenticator,
            IServiceProvider services
        ) {
            _logger = logger;
            _authenticator = authenticator;
            _services = services;
        }
            
        [HttpPost("createticket")]
        public async Task<ActionResult<Ticket>> CreateTicket([FromBody] MachineDataDto data) {
            _logger.LogInformation("API Fetched");
            await using var context = _services.GetService<ApplicationDbContext>();
            try {
                if (_authenticator.VerifyToken(data.Jtw, out int Id)) {
                    _logger.LogInformation("Token Correct");
                    var ticket = new Ticket();
                    ticket.MachineId = context.Machines.Where(m => m.Name == data.machine).Select(m => m.Id).FirstOrDefault();
                    ticket.Title = $"{DateTime.UtcNow} Prio: {data.priority}, {data.machine}";
                    ticket.Description = data.description;
                    ticket.DateCreated = DateTime.UtcNow;
                    ticket.Priority = int.Parse(data.priority);
                    ticket.ExpectedToBeDone = data.expectedAction;
                    ticket.MadeAnyChanges = data.selfTinkering;
                    ticket.DepartmentId = data.departmentId;
                    ticket.CreatorUserId = Id;
                    // ticket.Helper_UserId = null;
                    // ticket.Media = null;
                    ticket.Resolved = false;
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
