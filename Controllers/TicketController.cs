/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
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
        private readonly Authenticator _authenticator;
        private readonly IServiceProvider _services;
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Ticket> _tickets;

        public TicketController(
            ILogger<TicketController> logger, Authenticator authenticator,
            IServiceProvider services, ApplicationDbContext context
        ) {
            _logger = logger;
            _authenticator = authenticator;
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
        [HttpPost("CreateTicket")]
        public async Task<ActionResult<Ticket>> CreateTicket([FromBody] TicketDto data) {
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

        [Authorize(Policy = "user")]
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

        [Authorize(Policy = "user")]
        [HttpGet("ticketdata")]
        public async Task<ActionResult> GetTicketData([FromQuery] int id) {
            await using var context = _services.GetService<ApplicationDbContext>();
            try {
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
                        expectedToBeDone = ticket.ExpectedToBeDone
                    },
                    Messages = messages
                };
                return Ok(result);

            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
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
                                    Status = ticket.Resolved ? "closed" : "open",
                                    Priority = ticket.Priority,
                                    Description = ticket.Description,
                                    Machine = machine.Name,
                                    ETC = ticket.ExpectedToBeDone,
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
    }
}
