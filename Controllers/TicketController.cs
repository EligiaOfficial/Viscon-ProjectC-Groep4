using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Security.Claims;
using System.Linq.Expressions;
using System.Linq;
using Entities;
using ModelBinding;
using Viscon_ProjectC_Groep4.Services;
using Services;
using DTOs;
using Viscon_ProjectC_Groep4.Dto;
using Viscon_ProjectC_Groep4.Services.TicketService;

namespace Controllers;

[Route("[controller]")]
[ApiController]
public class TicketController : ControllerBase {
    private readonly ITicketStorage _ticketStorage;
    private readonly TicketServices _ticketServices;

    public TicketController(
        ITicketStorage ticketStorage,
        TicketServices ticketServices
    ) {
        _ticketStorage = ticketStorage;
        _ticketServices = ticketServices;
    }

    [Authorize(Policy = "key_user")]
    [HttpPost("create")]
    public async Task<ActionResult> CreateTicket(
        [FromClaim( Name = ClaimTypes.NameIdentifier )] int uid,
        [FromBody] Ticket ticket
    ) {
        await _ticketStorage.AddTicket(ticket);
        return Ok();
    }

    [Authorize]
    [HttpGet("get_data")]
    public async Task<ActionResult> GetTicket(
        [BindRequired, FromQuery] int id,
        [FromClaim( Name = ClaimTypes.Role )] RoleTypes role,
        [FromClaim( Name = "CompanyId" )] int cid
    ) {
        TicketDataDTO? ticketData = await _ticketStorage.GetTicketViewData(id);
        if (ticketData is null) return NotFound("Ticket not found");
        return Authorizer.MayViewTicket(
            role, cid, ticketData.CreatorCompanyId
        ) ? Ok(ticketData) : Forbid();
    }

    [HttpGet("tickets")]
    [Authorize(Policy = "USER")]
    public async Task<ActionResult> GetTickets(
        [FromClaim( Name = ClaimTypes.Role )] RoleTypes role,
        [FromClaim( Name = "CompanyId" )] int cid,
        [FromClaim( Name = "DepartmentId" )] int did
    ) {
        var ticketData = role switch {
            RoleTypes.USER => _ticketStorage.SelectTicketDataByCompanyId(cid),
            RoleTypes.KEYUSER => _ticketStorage.SelectTicketDataByCompanyId(cid),
            RoleTypes.VISCON => _ticketStorage.SelectTicketDataByDepartmentId(did),
            RoleTypes.ADMIN => _ticketStorage.SelectTicketData()
        };

        return Ok(ticketData);
    }

    [HttpPost("update")]
    [Authorize(Policy = "VISCON")]
    public async Task<IActionResult> UpdateTicket(
        [FromClaim( Name = ClaimTypes.NameIdentifier )] int uid,
        [FromClaim( Name = ClaimTypes.Role)] RoleTypes role,
        [FromBody] TicketUpdateDTO data
    ) {
        if (await _ticketStorage.UpdateTicket(data)) return Ok();
        // UpdateTicket returns false if it couldn't find the ticket.
        return NotFound();
    }

    [HttpPost("claim")]
    public async Task<IActionResult> Claim(
        int ticketId,
        [FromClaim(Name = ClaimTypes.NameIdentifier)] int uid,
        [FromClaim( Name = ClaimTypes.Role)] RoleTypes role
    ) {
        // Can KEYUSER claim? Wasn't it supposed to be VISCON and ADMIN?
        if (!Authorizer.HasAuthority(role, RoleTypes.KEYUSER))
            return Forbid();

        if (await _ticketStorage.ClaimTicket(ticketId, uid)) return Ok();
        return NotFound();
    }

    [Authorize(Policy = "USER")]
    [HttpGet("archive")]
    public async Task<IActionResult> Archive(
        [FromClaim(Name = ClaimTypes.NameIdentifier)] int uid
    ) {
        return Ok(_ticketStorage.SelectArchivedTicketData(uid));
    }

    [Authorize(Policy = "key_user")]
    [HttpPost("createticket")]
    public async Task<ActionResult<Ticket>> CreateTicket(
        [FromForm] CreateTicketDto data,
        [FromClaim( Name = ClaimTypes.NameIdentifier)] int uid
    ) =>
        await _ticketServices.CreateTicket(data, uid);
}


