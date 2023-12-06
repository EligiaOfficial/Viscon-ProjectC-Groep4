
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
    public class TicketController : ControllerBase
    {
        private readonly ILogger<TicketController> _logger;
        private readonly IServiceProvider _services;
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Ticket> _tickets;

        public TicketController(
            ILogger<TicketController> logger, IServiceProvider services,
            ApplicationDbContext context
        ) {
            _logger = logger;
           _services = services;
            _context = context;
            _tickets = context.Set<Ticket>();
        }

        [Authorize(Policy = "user")]
        [HttpPost]
        [Route("AddMessage")]
        public async Task<IActionResult> AddMessage(MessageDto data) {
            _logger.LogInformation("API Fetched");
            _logger.LogInformation("\n\n\n");
            await using var context = _services.GetService<ApplicationDbContext>();
            var message = new Message{
                TimeSent = DateTime.UtcNow,
                TicketId = context!.Tickets.Where(_ => _.Id == data.ticketId).Select(_ => _.Id).FirstOrDefault(),
                Content = data.content,
                Sender = data.sender
            };
            context!.Messages.Add(message);
            await context.SaveChangesAsync();
            _logger.LogInformation("Added message to tickId " + message.TicketId);
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

        [Authorize(Policy = "key_user")]
        [HttpPost("createticket")]
        public async Task<ActionResult<Ticket>> CreateTicket([FromForm] CreateTicketDto data)
        {
            {
                _logger.LogInformation("API Fetched");
                int id = Int32.Parse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
                await using var context = _services.GetService<ApplicationDbContext>();
                var ticket = new Ticket();
                ticket.MachineId = context!.Machines.Where(m => m.Name == data.Machine).Select(m => m.Id).FirstOrDefault();
                ticket.Title = data.Title;
                ticket.Description = data.Description;
                ticket.DateCreated = DateTime.UtcNow;
                ticket.Urgent = data.Priority;
                ticket.ExpectedToBeDone = data.ExpectedAction;
                ticket.MadeAnyChanges = data.SelfTinkering;
                ticket.DepartmentId = data.DepartmentId;
                ticket.CreatorUserId = id;
                ticket.Resolved = false;
                context.Tickets.Add(ticket);
                context.SaveChanges();

                using MemoryStream memoryStream = new();
                foreach (IFormFile image in data.Images)
                {
                    await image.CopyToAsync(memoryStream);
                    VisualFile visualFile = new()
                    {
                        Name = image.FileName,
                        Image = memoryStream.ToArray(),
                        TicketId = ticket.Id
                    };
                    _context.VisualFiles.Add(visualFile);
                }

                context.SaveChanges();
                return Ok(ticket.Id);
            }
        }
        
        [Authorize(Policy = "key_user")]
        [HttpPost("createticketforsomeone")]
        public async Task<ActionResult<Ticket>> CreateTicketForSomeone([FromForm] CreateTicketDto data)
        {
            _logger.LogInformation("API Fetched");
            await using var context = _services.GetService<ApplicationDbContext>();

            _logger.LogInformation("Token Correct");
            var ticket = new Ticket();
            ticket.MachineId = context!.Machines.Where(m => m.Name == data.Machine).Select(m => m.Id).FirstOrDefault();
            ticket.Title = $"{DateTime.UtcNow} Prio: {data.Priority}, {data.Machine}";
            ticket.Description = data.Description;
            ticket.DateCreated = DateTime.UtcNow;
            ticket.Urgent = false; //int.Parse(data.priority);
            ticket.ExpectedToBeDone = data.ExpectedAction;
            ticket.MadeAnyChanges = data.SelfTinkering;
            ticket.DepartmentId = data.DepartmentId;
            ticket.CreatorUserId = context.Users.Where(u => u.Email == data.UserEmail).Select(u => u.Id).FirstOrDefault();
            ticket.Resolved = false;
            context.Tickets.Add(ticket);
            context.SaveChanges();

            using MemoryStream memoryStream = new();
            foreach (IFormFile image in data.Images)
            {
                await image.CopyToAsync(memoryStream);
                VisualFile visualFile = new()
                {
                    Name = image.FileName,
                    Image = memoryStream.ToArray(),
                    TicketId = ticket.Id
                };
                _context.VisualFiles.Add(visualFile);
            }
            context.SaveChanges();
            return Ok(ticket.Id);
        }

        [Authorize(Policy = "user")]
        [HttpPost("UserName")]
        public async Task<IActionResult> GetUser(getUserDto data) {
            await using var context = _services.GetService<ApplicationDbContext>();
            var user = context.Users.FirstOrDefault(_ => _.Id == data.Id);
            return Ok(user.FirstName + " " + user.LastName);
        }

        [Authorize(Policy = "user")]
        [HttpGet("ticketdata")]
        public async Task<ActionResult> GetTicketData([FromQuery] int id) {
            await using var context = _services.GetService<ApplicationDbContext>();
            var ticket = context!.Tickets
                .Include(t => t.Department)
                .Include(t => t.Machine)
                .Include(t => t.Creator)
                .ThenInclude(u => u.Company)
                .Include(t => t.Helper)
                .FirstOrDefault(x => x.Id == id);
            if (ticket == null) return NotFound("No Ticket Found");
            var messages = context.Messages
                .Where(m => m.TicketId == ticket.Id)
                .Join(context.Users,
                    message => message.Sender,
                    user => user.Id,
                    (message, user) => new {
                        Content = message.Content,
                        Sender = $"{user.FirstName} {user.LastName}",
                        TimeSent = message.TimeSent
                    })
                .ToList();
            var result = new {
                Helper = ticket.HelperUserId != null
                    ? $"{ticket.Helper.FirstName} {ticket.Helper.LastName}"
                    : "Unassigned",
                Company = ticket.Creator.Company.Name,
                Department = ticket.Department.Speciality,
                Machine = ticket.Machine.Name,
                Creator = $"{ticket.Creator.FirstName} {ticket.Creator.LastName}",
                Ticket = new {
                    title = ticket.Title,
                    description = ticket.Description,
                    madeAnyChanges = ticket.MadeAnyChanges,
                    expectedToBeDone = ticket.ExpectedToBeDone,
                    urgent = ticket.Urgent,
                    resolved = ticket.Resolved,
                    published = ticket.Public
                },
                Messages = messages
            };
            return Ok(result);
        }

        [HttpGet("tickets")]
        public async Task<IActionResult> GetTickets()
        {
            List<GetTicketsDto> tickets = await (from ticket in _tickets
                                join machine in _context.Machines
                                    on ticket.MachineId equals machine.Id
                                join department in _context.Departments
                                    on ticket.DepartmentId equals department.Id
                                join user in _context.Users
                                    on ticket.HelperUserId equals user.Id into grouping
                                from result in grouping.DefaultIfEmpty()
                                select new GetTicketsDto
                                {
                                    TicketID = ticket.Id,
                                    Title = ticket.Title,
                                    Status = ticket.Resolved ? "closed" : "open",
                                    Urgent = ticket.Urgent ? "Yes" : "No",
                                    Company = ticket.Creator.Company.Name,
                                    Machine = machine.Name,
                                    Department = department.Speciality,
                                    Supporter = (result.LastName + " " + result.FirstName) ?? "-",
                                    Created = ticket.DateCreated,
                                    Issuer = _context.Users.Where(user => user.Id == ticket.CreatorUserId)
                                        .Select(result => result.LastName + ", " + result.FirstName)
                                        .FirstOrDefault()!
                                })
                                .ToListAsync();
            
            return Ok(tickets);
        }
        
        [Authorize(Policy = "viscon")]
        [HttpPost]
        [Route("changeticket")]
        public async Task<IActionResult> ChangeTicketDepartment(ChangeTicketDto data)
        {
            await using var context = _services.GetService<ApplicationDbContext>();
            int id = Int32.Parse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var user = context.Users.FirstOrDefault(_ => _.Id == id)!;
            if (user.Role >= RoleTypes.KEYUSER) return StatusCode(500);

            var ticket = context.Tickets.FirstOrDefault(_ => _.Id == data.id);
            if (data.department != 0) ticket!.DepartmentId = data.department;
            ticket!.Urgent = data.urgent;
            ticket.Public = data.publish;
            ticket.Resolved = data.resolved;
            await context.SaveChangesAsync();
            return Ok("Success");
    }
        
        [Authorize(Policy = "viscon")]
        [HttpPost]
        [Route("claim")]
        public async Task<IActionResult> Claim(int id)
        {
            await using var context = _services.GetService<ApplicationDbContext>();
            int userId = Int32.Parse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var user = context.Users.FirstOrDefault(_ => _.Id == userId)!;
            if (user.Role >= RoleTypes.KEYUSER) return StatusCode(500);

            var ticket = context.Tickets.FirstOrDefault(_ => _.Id == id)!;
            ticket.HelperUserId = user.Id;
            await context.SaveChangesAsync();
            return Ok("Success");
    }
    }
}
