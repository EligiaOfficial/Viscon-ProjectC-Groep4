using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
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

        [Authorize(Policy = "user")]
        [HttpPost]
        [Route("AddMessage")]
        public async Task<IActionResult> AddMessage(MessageDto data) {
            _logger.LogInformation("API Fetched");
            _logger.LogInformation("\n\n\n");
            await using var context = _services.GetService<ApplicationDbContext>();
            try {
                var message = new Message{
                    TimeSent = DateTime.UtcNow,
                    TicketId = context!.Tickets.Where(_ => _.Id == data.ticketId).Select(_ => _.Id).FirstOrDefault(),
                    Content = data.content,
                    Sender = data.sender
                };
                try {
                    context!.Messages.Add(message);
                    await context.SaveChangesAsync();
                    _logger.LogInformation("Added message to tickId " + message.TicketId);
                }
                catch (Exception ex) {
                    _logger.LogError(ex.ToString());
                    return Ok("Error");
                }
            }
            catch (Exception ex) {
                _logger.LogError(ex.ToString());
                return Ok("Error");
            }
            return Ok("Message Added");
        }

        [Authorize(Policy = "user")]
        [HttpPost("createticket")]
        public async Task<ActionResult<Ticket>> CreateTicket([FromBody] MachineDataDto data) {
            _logger.LogInformation("API Fetched");
            int id = Int32.Parse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            await using var context = _services.GetService<ApplicationDbContext>();
            try {
                    var ticket = new Ticket();
                    ticket.MachineId = context!.Machines.Where(m => m.Name == data.machine).Select(m => m.Id).FirstOrDefault();
                    ticket.Title = $"{DateTime.UtcNow} Prio: {data.priority}, {data.machine}";
                    ticket.Description = data.description;
                    ticket.DateCreated = DateTime.UtcNow;
                    ticket.Priority = 1; //int.Parse(data.priority);
                    ticket.ExpectedToBeDone = data.expectedAction;
                    ticket.MadeAnyChanges = data.selfTinkering;
                    ticket.DepartmentId = data.departmentId;
                    ticket.CreatorUserId = id;
                    // ticket.Helper_UserId = null;
                    // ticket.Media = null;
                    ticket.Resolved = false;
                    context.Tickets.Add(ticket);
                    context.SaveChanges();
                    return Ok(ticket);
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

        [HttpGet("ticketdata")]
        public async Task<ActionResult> GetTicketData([FromQuery] int id) {
            await using var context = _services.GetService<ApplicationDbContext>();
            try {
                var ticket = context!.Tickets.FirstOrDefault(x => x.Id == id);
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

        [Authorize(Policy = "viscon")]
        [HttpGet("newtickets")]
        public async Task<ActionResult<ICollection<Ticket>>> NewTickets() {
            await using (var context = _services.GetService<ApplicationDbContext>()) {
                return context.Tickets
                    .Where(t => !t.Resolved)
                    .Include(t => t.Machine)
                    .Include(t => t.Department)
                    .Include(t => t.Creator)
                    .Include(t => t.Helper)
                    .ToArray();
            }
        }
    }
}
