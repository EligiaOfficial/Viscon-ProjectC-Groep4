using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
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
        )
        {
            _logger = logger;
            _authenticator = authenticator;
            _services = services;
        }

        [Authorize(Policy = "user")]
        [HttpPost]
        [Route("AddMessage")]
        public async Task<IActionResult> AddMessage(MessageDto data)
        {
            _logger.LogInformation("API Fetched");
            _logger.LogInformation("\n\n\n");
            await using var context = _services.GetService<ApplicationDbContext>();
            try
            {
                var message = new Message
                {
                    TimeSent = DateTime.UtcNow,
                    TicketId = context!.Tickets.Where(_ => _.Id == data.ticketId).Select(_ => _.Id).FirstOrDefault(),
                    Content = data.content,
                    Sender = data.sender
                };
                try
                {
                    context!.Messages.Add(message);
                    await context.SaveChangesAsync();
                    _logger.LogInformation("Added message to tickId " + message.TicketId);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex.ToString());
                    return Ok("Error");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return Ok("Error");
            }
            return Ok("Message Added");
        }

        [HttpGet("getimage/{ticketId}")]
        public IActionResult GetImage(int ticketId)
        {
            using (var scope = _services.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                var context = serviceProvider.GetRequiredService<ApplicationDbContext>();

                var visualFile = context.VisualFiles.FirstOrDefault(vf => vf.TicketId == ticketId);

                if (visualFile == null)
                {
                    return NotFound(); // Of een andere foutafhandeling
                }

                // Retourneer de afbeeldingsbytes als een File-resultaat met het juiste MIME-type
                return File(visualFile.Image, "image/jpeg"); // Pas het MIME-type aan indien nodig
            }
        }

        [Authorize(Policy = "user")]
        [HttpPost("createticket")]
        public async Task<ActionResult<Ticket>> CreateTicket([FromForm] TicketDto data)
        {
            {
                _logger.LogInformation("API Fetched");
                int id = Int32.Parse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
                await using var context = _services.GetService<ApplicationDbContext>();
                try
                {
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
                    ticket.Resolved = false;
                    context.Tickets.Add(ticket);
                    context.SaveChanges();

                    // ticket.Helper_UserId = null;
                    if (data.image != null)
                    {
                        var VisualFile = new VisualFile();
                        VisualFile.Name = ticket.Title;
                        VisualFile.TicketId = ticket.Id;
                        using (var memoryStream = new MemoryStream())
                        {
                            await data.image.CopyToAsync(memoryStream);
                            VisualFile.Image = memoryStream.ToArray();
                        }


                        context.VisualFiles.Add(VisualFile);


                    }




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
        }
        [HttpPost("createticketforsomeone")]
        public async Task<ActionResult<Ticket>> CreateTicketForSomeone([FromForm] TicketDto data)
        {
            _logger.LogInformation("API Fetched");
            await using var context = _services.GetService<ApplicationDbContext>();
            try
            {

                _logger.LogInformation("Token Correct");
                var ticket = new Ticket();
                ticket.MachineId = context!.Machines.Where(m => m.Name == data.machine).Select(m => m.Id).FirstOrDefault();
                ticket.Title = $"{DateTime.UtcNow} Prio: {data.priority}, {data.machine}";
                ticket.Description = data.description;
                ticket.DateCreated = DateTime.UtcNow;
                ticket.Priority = 1; //int.Parse(data.priority);
                ticket.ExpectedToBeDone = data.expectedAction;
                ticket.MadeAnyChanges = data.selfTinkering;
                ticket.DepartmentId = data.departmentId;
                ticket.CreatorUserId = context.Users.Where(u => u.Email == data.userEmail).Select(u => u.Id).FirstOrDefault();
                ticket.Resolved = false;
                context.Tickets.Add(ticket);
                context.SaveChanges();
                // ticket.Helper_UserId = null;
                if (data.image != null)
                {
                    var VisualFile = new VisualFile();
                    VisualFile.Name = ticket.Title;
                    VisualFile.TicketId = ticket.Id;
                    using (var memoryStream = new MemoryStream())
                    {
                        await data.image.CopyToAsync(memoryStream);
                        VisualFile.Image = memoryStream.ToArray();
                    }


                    context.VisualFiles.Add(VisualFile);


                }




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
    }
}