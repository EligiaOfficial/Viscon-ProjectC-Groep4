using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Entities;
using Viscon_ProjectC_Groep4.Dto;
using ModelBinding;
using Viscon_ProjectC_Groep4.Services;
using Viscon_ProjectC_Groep4.Services.TicketService;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Viscon_ProjectC_Groep4.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly TicketServices _ticketServices;

        public TicketController(
            ApplicationDbContext dbContext,
            TicketServices ticketServices
        )
        {
            _dbContext = dbContext;
            _ticketServices = ticketServices;
        }

        [Authorize(Policy = "user")] [HttpPost("AddMessage")]
        public async Task<IActionResult> AddMessage(
            [FromForm] MessageDto data,
            [FromClaim(Name = ClaimTypes.NameIdentifier)]
            int uid
        ) => await _ticketServices.AddMessage(data, uid);

        
        //[HttpGet("getimage/{ticketId}")]
        //public async Task<IActionResult> GetImage(int ticketId) =>
        //    _ticketServices.GetImage(ticketId);


        [Authorize(Policy = "key_user")]
        [HttpPost("createticket")]
        public async Task<ActionResult<Ticket>> CreateTicket(
            [FromForm] CreateTicketDto data,
            [FromClaim( Name = ClaimTypes.NameIdentifier)] int uid
        ) => 
            await _ticketServices.CreateTicket(data, uid);

        [Authorize(Policy = "user")] [HttpPost("UserName")]
        public async Task<IActionResult> GetUser(getUserDto data) =>
            await _ticketServices.GetUser(data);

        [Authorize(Policy = "user")] [HttpGet("ticketdata")]
        public async Task<ActionResult> GetTicketData([FromQuery] int id) =>
            await _ticketServices.GetTicketData(id);

        [HttpGet("tickets")]
        public async Task<IActionResult> GetTickets([FromClaim(Name = ClaimTypes.NameIdentifier)] int uid) =>
            await _ticketServices.GetTickets(uid);
        
        [Authorize(Policy = "viscon")]
        [HttpPost("changeticket")]
        public async Task<IActionResult> ChangeTicketDepartment(ChangeTicketDto data) =>
            await _ticketServices.ChangeTicketDepartment(data);


        [Authorize(Policy = "viscon")]
        [HttpPost("claim")]
        public async Task<IActionResult> Claim(int ticketId, [FromClaim(Name = ClaimTypes.NameIdentifier)] int uid) =>
            await _ticketServices.Claim(ticketId, uid);

        [Authorize(Policy = "user")]
        [HttpGet("archive")]
        public async Task<IActionResult> GetArchive() => await _ticketServices.GetArchive();

    }
}
