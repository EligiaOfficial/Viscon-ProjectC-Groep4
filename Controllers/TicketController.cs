using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore; // Make sure this namespace exists
using Services;
using Viscon_ProjectC_Groep4.Dto;
using ModelBinding;

namespace Viscon_ProjectC_Groep4.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ILogger<TicketController> _logger;
        private readonly ApplicationDbContext _dbContext;

        public TicketController(
            ILogger<TicketController> logger, ApplicationDbContext dbContext
        ) {
            _logger = logger;
            _dbContext = dbContext;
        }

        [Authorize(Policy = "user")]
        [HttpPost]
        [Route("AddMessage")]
        public async Task<IActionResult> AddMessage(
            MessageDto data,
            [FromClaim(Name = ClaimTypes.NameIdentifier)] int uid
        ) {
            _logger.LogInformation("API Fetched");
            _logger.LogInformation("\n\n\n");
            var message = new Message{
                TimeSent = DateTime.UtcNow,
                TicketId = _dbContext.Tickets.Where(_ => _.Id == data.ticketId).Select(_ => _.Id).FirstOrDefault(),
                Content = data.content,
                Sender = uid
            };
            _dbContext.Messages.Add(message);
            await _dbContext.SaveChangesAsync();
            _logger.LogInformation("Added message to tickId " + message.TicketId);
            return Ok("Message Added");
        }
        
        [HttpGet("getimage/{ticketId}")]
        public IActionResult GetImage(int ticketId)
        {
            var visualFile = _dbContext.VisualFiles.FirstOrDefault(vf => vf.TicketId == ticketId);
    
            if (visualFile == null)
            {
                return NotFound(); // Of een andere foutafhandeling
            }
    
            // Retourneer de afbeeldingsbytes als een File-resultaat met het juiste MIME-type
            return File(visualFile.Image, "image/jpeg"); // Pas het MIME-type aan indien nodig
        }

        [Authorize(Policy = "key_user")]
        [HttpPost("createticket")]
        public async Task<ActionResult<Ticket>> CreateTicket(
            [FromForm] CreateTicketDto data,
            [FromClaim( Name = ClaimTypes.NameIdentifier)] int uid
        )
        {
            {
                _logger.LogInformation("API Fetched");
                var ticket = new Ticket();
                ticket.MachineId = _dbContext.Machines.Where(m => m.Name == data.Machine).Select(m => m.Id).FirstOrDefault();
                ticket.Title = data.Title;
                ticket.Description = data.Description;
                ticket.DateCreated = DateTime.UtcNow;
                ticket.Urgent = data.Priority;
                ticket.ExpectedToBeDone = data.ExpectedAction;
                ticket.MadeAnyChanges = data.SelfTinkering;
                ticket.DepartmentId = data.DepartmentId;
                ticket.CreatorUserId = uid;
                ticket.Resolved = false;
                _dbContext.Tickets.Add(ticket);
                _dbContext.SaveChanges();

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
                    _dbContext.VisualFiles.Add(visualFile);
                }

                _dbContext.SaveChanges();
                return Ok(ticket.Id);
            }
        }
        
        [Authorize(Policy = "key_user")]
        [HttpPost("createticketforsomeone")]
        public async Task<ActionResult<Ticket>> CreateTicketForSomeone([FromForm] CreateTicketDto data)
        {
            _logger.LogInformation("API Fetched");

            _logger.LogInformation("Token Correct");
            var ticket = new Ticket();
            ticket.MachineId = _dbContext.Machines.Where(m => m.Name == data.Machine).Select(m => m.Id).FirstOrDefault();
            ticket.Title = $"{DateTime.UtcNow} Prio: {data.Priority}, {data.Machine}";
            ticket.Description = data.Description;
            ticket.DateCreated = DateTime.UtcNow;
            ticket.Urgent = false; //int.Parse(data.priority);
            ticket.ExpectedToBeDone = data.ExpectedAction;
            ticket.MadeAnyChanges = data.SelfTinkering;
            ticket.DepartmentId = data.DepartmentId;
            ticket.CreatorUserId = _dbContext.Users.Where(u => u.Email == data.UserEmail).Select(u => u.Id).FirstOrDefault();
            ticket.Resolved = false;
            _dbContext.Tickets.Add(ticket);
            _dbContext.SaveChanges();

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
                _dbContext.VisualFiles.Add(visualFile);
            }
            _dbContext.SaveChanges();
            return Ok(ticket.Id);
        }

        [Authorize(Policy = "user")]
        [HttpPost("UserName")]
        public async Task<IActionResult> GetUser(getUserDto data) {
            var user = _dbContext.Users.FirstOrDefault(_ => _.Id == data.Id);
            return Ok(user.FirstName + " " + user.LastName);
        }

        [Authorize(Policy = "user")]
        [HttpGet("ticketdata")]
        public async Task<ActionResult> GetTicketData([FromQuery] int id) {
            var ticket = _dbContext.Tickets
                .Include(t => t.Department)
                .Include(t => t.Machine)
                .Include(t => t.Creator)
                .ThenInclude(u => u.Company)
                .Include(t => t.Helper)
                .FirstOrDefault(x => x.Id == id);
            if (ticket == null) return NotFound("No Ticket Found");
            var messages = _dbContext.Messages
                .Where(m => m.TicketId == ticket.Id)
                .Join(_dbContext.Users,
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
                    published = ticket.Public,
                    dateCreated = ticket.DateCreated
                },
                Messages = messages
            };
            return Ok(result);
        }

        [HttpGet("tickets")]
        public async Task<IActionResult> GetTickets([FromClaim(Name = ClaimTypes.NameIdentifier)] int uid)
        {
            var usr = _dbContext.Users.FirstOrDefault(_ => _.Id == uid)!;

            var tickets = from ticket in _dbContext.Tickets
                join machine in _dbContext.Machines on ticket.MachineId equals machine.Id
                join department in _dbContext.Departments on ticket.DepartmentId equals department.Id
                join user in _dbContext.Users on ticket.HelperUserId equals user.Id into grouping
                from result in grouping.DefaultIfEmpty()
                select new
                {
                    TicketID = ticket.Id,
                    Title = ticket.Title,
                    Status = ticket.Resolved ? "closed" : "open",
                    Urgent = ticket.Urgent ? "Yes" : "No",
                    Company = ticket.Creator.Company.Name,
                    CompanyId = ticket.Creator.Company.Id,
                    Machine = machine.Name,
                    Department = department.Speciality,
                    DepartmentId = department.Id,
                    Supporter = (result.LastName + " " + result.FirstName) ?? "-",
                    Created = ticket.DateCreated,
                    Issuer = _dbContext.Users.Where(u => u.Id == ticket.CreatorUserId)
                        .Select(u => u.LastName + ", " + u.FirstName)
                        .FirstOrDefault()!
                };

            tickets = usr.Role switch {
                >= RoleTypes.KEYUSER => tickets.Where(_ => _.CompanyId == usr.CompanyId),
                RoleTypes.VISCON => tickets.Where(_ => _.DepartmentId == usr.DepartmentId),
                _ => tickets
            };

            List<GetTicketsDto> res = await tickets.Select(t => new GetTicketsDto
            {
                TicketID = t.TicketID,
                Title = t.Title,
                Status = t.Status,
                Urgent = t.Urgent,
                Company = t.Company,
                Machine = t.Machine,
                Department = t.Department,
                Supporter = t.Supporter,
                Created = t.Created,
                Issuer = t.Issuer
            }).ToListAsync();
            
            return Ok(res);
        }
        
        [Authorize(Policy = "viscon")]
        [HttpPost]
        [Route("changeticket")]
        public async Task<IActionResult> ChangeTicketDepartment(
            ChangeTicketDto data,
        )
        {
            var ticket = _dbContext.Tickets.FirstOrDefault(_ => _.Id == data.id);
            if (data.department != 0) ticket!.DepartmentId = data.department;
            ticket!.Urgent = data.urgent;
            ticket.Public = data.publish;
            ticket.Resolved = data.resolved;
            await _dbContext.SaveChangesAsync();
            return Ok("Success");
    }
        
        [Authorize(Policy = "viscon")]
        [HttpPost]
        [Route("claim")]
        public async Task<IActionResult> Claim(
            int id, [FromClaim(Name = ClaimTypes.NameIdentifier)] int uid
        )
        {
            var user = _dbContext.Users.FirstOrDefault(_ => _.Id == uid)!;

            var ticket = _dbContext.Tickets.FirstOrDefault(_ => _.Id == id)!;
            ticket.HelperUserId = user.Id;
            await _dbContext.SaveChangesAsync();
            return Ok("Success");
        }
    }
}
