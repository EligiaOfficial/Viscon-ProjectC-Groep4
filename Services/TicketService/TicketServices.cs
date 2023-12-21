/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */

using System.Security.Claims;
using System.Security.Cryptography;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModelBinding;
using Viscon_ProjectC_Groep4.Dto;
using Viscon_ProjectC_Groep4.Services.AuthService;

namespace Viscon_ProjectC_Groep4.Services.TicketService
{
    public class TicketServices : ControllerBase, ITicketServices
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger<AuthServices> _logger;

        public TicketServices(
            ApplicationDbContext dbContext,
            ILogger<AuthServices> logger
        )
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<IActionResult> AddMessage(
            MessageDto data,
            [FromClaim(Name = ClaimTypes.NameIdentifier)]
            int uid
        )
        {
            _logger.LogInformation("API Fetched");
            _logger.LogInformation("\n\n\n");
            var message = new Message
            {
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

        //[HttpGet("getimage/{ticketId}")]
        //public IActionResult GetImage(int ticketId)
        //{
        //    var visualFile = _dbContext.VisualFiles.FirstOrDefault(vf => vf.TicketId == ticketId);

        //    if (visualFile == null)
        //    {
        //        return NotFound(); // Of een andere foutafhandeling
        //    }

        //    // Retourneer de afbeeldingsbytes als een File-resultaat met het juiste MIME-type
        //    return File(visualFile.Image, "image/jpeg"); // Pas het MIME-type aan indien nodig
        //}

        public async Task<ActionResult<Ticket>> CreateTicket(CreateTicketDto data, int id)
        {
            var user = _dbContext.Users.FirstOrDefault(_ => _.Id == id)!;
            _logger.LogInformation("API Fetched");
            _logger.LogInformation(id.ToString());
            _logger.LogInformation(data.UserEmail);
            var ticket = new Ticket
            {
                CreatorUserId = user.Role <= RoleTypes.VISCON
                    ? _dbContext.Users.Where(_ => _.Email == data.UserEmail).Select(_ => _.Id).FirstOrDefault()
                    : id,
                MachineId = data.Machine,
                Title = data.Title,
                Description = data.Description,
                DateCreated = DateTime.UtcNow,
                Urgent = data.Priority,
                ExpectedToBeDone = data.ExpectedAction,
                MadeAnyChanges = data.SelfTinkering,
                DepartmentId = data.DepartmentId,
                Resolved = false
            };
            _dbContext.Tickets.Add(ticket);
            await _dbContext.SaveChangesAsync();

            string content = $"What do you see happening?\n{data.Description}\n\nWhat have you tried to fix it?\n{data.ExpectedAction}\n\nHave you made any changes to the machine?\n{data.SelfTinkering}";

            Message newMessage = new()
            {
                Content = content,
                RelatedTicket = ticket,
                Sender = ticket.CreatorUserId,
                TicketId = ticket.Id,
                TimeSent = DateTime.UtcNow
            };

            _dbContext.Messages.Add(newMessage);
            await _dbContext.SaveChangesAsync();

            foreach (IFormFile image in data.Images)
            {
                using MemoryStream memoryStream = new();
                await image.CopyToAsync(memoryStream);
                VisualFile visualFile = new()
                {
                    Name = image.FileName,
                    Image = memoryStream.ToArray(),
                    MessageId = newMessage.Id
                };
                _dbContext.VisualFiles.Add(visualFile);
            }

            await _dbContext.SaveChangesAsync();
            return Ok(ticket.Id);
        }

        public async Task<IActionResult> GetUser(getUserDto data)
        {
            var user = _dbContext.Users.FirstOrDefault(_ => _.Id == data.Id);
            return Ok(user.FirstName + " " + user.LastName);
        }

        public async Task<ActionResult> GetTicketData(int id)
        {
            var ticket = _dbContext.Tickets
                .Include(t => t.Department)
                .Include(t => t.Machine)
                .Include(t => t.Creator)
                .ThenInclude(u => u.Company)
                .Include(t => t.Helper)
                .FirstOrDefault(x => x.Id == id);
            if (ticket == null) return NotFound("No Ticket Found");

            var messages = await (
                    from message in _dbContext.Messages
                    where message.TicketId == ticket.Id
                    join user in _dbContext.Users on message.Sender equals user.Id
                    select new { message, user }
                ).ToListAsync();

            var finalMessage = (from message in messages
                               join file in _dbContext.VisualFiles on message.message.Id equals file.MessageId into grouping
                               select new
                               {
                                   Content = message.message.Content,
                                   Sender = $"{message.user.FirstName} {message.user.LastName}",
                                   TimeSent = message.message.TimeSent,
                                   SenderId = message.message.Sender,
                                   Images = grouping.Where(image => image != null).Select(image => new
                                   {
                                       ImageId = image.Id,
                                       ImageFile = image.Image,
                                       ImageName = image.Name
                                   }).ToList(),
                               }).ToList();

            var result = new
            {
                Helper = ticket.HelperUserId != null
                    ? $"{ticket.Helper.FirstName} {ticket.Helper.LastName}"
                    : "Unassigned",
                Company = ticket.Creator.Company.Name,
                Department = ticket.Department.Speciality,
                Machine = ticket.Machine.Name,
                Creator = $"{ticket.Creator.FirstName} {ticket.Creator.LastName}",
                Ticket = new
                {
                    title = ticket.Title,
                    description = ticket.Description,
                    madeAnyChanges = ticket.MadeAnyChanges,
                    expectedToBeDone = ticket.ExpectedToBeDone,
                    urgent = ticket.Urgent,
                    resolved = ticket.Resolved,
                    published = ticket.Public,
                    dateCreated = ticket.DateCreated
                },
                Messages = finalMessage
            };
            return Ok(result);
        }

        public async Task<IActionResult> GetTickets(int id)
        {
            var usr = _dbContext.Users.FirstOrDefault(_ => _.Id == id)!;

            var tickets = from ticket in _dbContext.Tickets
                join machine in _dbContext.Machines on ticket.MachineId equals machine.Id
                join department in _dbContext.Departments on ticket.DepartmentId equals department.Id
                join user in _dbContext.Users on ticket.HelperUserId equals user.Id into grouping
                from result in grouping.DefaultIfEmpty()
                select new
                {
                    TicketID = ticket.Id,
                    Title = ticket.Title,
                    Status = ticket.Resolved ? "Closed" : "Open",
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

            tickets = usr.Role switch
            {
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

        public Task<IActionResult> ChangeTicketDepartment(ChangeTicketDto data)
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> ChangeTicketDepartment(ChangeTicketDto data, int id)
        {
            var user = _dbContext.Users.FirstOrDefault(_ => _.Id == id)!;
            if (user.Role >= RoleTypes.KEYUSER) return StatusCode(500);

            var ticket = _dbContext.Tickets.FirstOrDefault(_ => _.Id == data.id);
            if (data.department != 0) ticket!.DepartmentId = data.department;
            ticket!.Urgent = data.urgent;
            ticket.Public = data.publish;
            ticket.Resolved = data.resolved;
            await _dbContext.SaveChangesAsync();
            return Ok("Success");
        }

        public async Task<IActionResult> Claim(int ticketId, int userId)
        {
            var user = _dbContext.Users.FirstOrDefault(_ => _.Id == userId);
            var ticket = _dbContext.Tickets.FirstOrDefault(_ => _.Id == ticketId);

            if (user?.Role >= RoleTypes.KEYUSER)
            {
                return StatusCode(500);
            }

            Console.WriteLine(user);
            Console.WriteLine(ticket);

            if (user == null || ticket == null) return StatusCode(500);
            ticket.HelperUserId = user.Id;
            await _dbContext.SaveChangesAsync();
            return Ok("Success");
        }

        public async Task<IActionResult> GetArchive()
        {
            var companies = from company in _dbContext.Companies
                            select new { company.Id, company.Name };

            var result = await(from ticket in _dbContext.Tickets
                           where ticket.Resolved == true && ticket.Public == true
                           join user in _dbContext.Users on ticket.CreatorUserId equals user.Id
                           join machine in _dbContext.Machines on ticket.MachineId equals machine.Id
                           join department in _dbContext.Departments on ticket.DepartmentId equals department.Id
                           join company in companies on user.CompanyId equals company.Id
                           join helper in _dbContext.Users on ticket.HelperUserId equals helper.Id into grouping
                           from newgroup in grouping.DefaultIfEmpty()
                           select new
                           {
                               TicketID = ticket.Id,
                               Title = ticket.Title,
                               Status = ticket.Resolved ? "Closed" : "Open",
                               Urgent = ticket.Urgent ? "Yes" : "No",
                               Company = company.Name,
                               Machine = machine.Name,
                               Department = department.Speciality,
                               Supporter = newgroup.LastName + ", " + newgroup.FirstName ?? "-",
                               Created = ticket.DateCreated,
                               Issuer = user.LastName + ", " + user.FirstName
                           }).ToListAsync();

            return Ok(result);
    }
}
}