using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Services;
using Entities;
using ModelBinding;
using DTOs;

namespace Controllers;

[Route("[controller]")]
[ApiController]
public class MessageController : ControllerBase {
    private readonly IMessageStorage _messageStorage;
    private readonly ITicketStorage _ticketStorage;

    public MessageController(
            IMessageStorage messageStorage,
            ITicketStorage ticketStorage
        ) {
        _messageStorage = messageStorage;
        _ticketStorage = ticketStorage;
    }

    [HttpGet("page")]
    public async Task<IActionResult> GetMessagePage(
        [FromQuery] int ticketId,
        [FromQuery] int afterId,
        [FromClaim( Name = "companyId" )] int cid,
        [FromClaim( Name = ClaimTypes.NameIdentifier )] RoleTypes role
    ) {
        int? ticketCompanyId = await _ticketStorage.GetTicketCompanyId(ticketId);
        if (ticketCompanyId is null) return NotFound();
        if (!Authorizer.MayViewTicket(role, cid, (int)ticketCompanyId))
            return Forbid();
        return Ok(_messageStorage.GetPage(afterId));
    }

    [HttpGet("get_messages")]
    public async Task<IActionResult> GetMessages(
        [FromQuery] int ticketId,
        [FromClaim( Name = "companyId" )] int cid,
        [FromClaim( Name = ClaimTypes.NameIdentifier )] RoleTypes role
    ) {
        int? ticketCompanyId = await _ticketStorage.GetTicketCompanyId(ticketId);
        if (ticketCompanyId is null) return NotFound();
        if (!Authorizer.MayViewTicket(role, cid, (int)ticketCompanyId))
            return Forbid();
        return Ok(_messageStorage.GetMessagesByTicketId(ticketId));
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateMessage(
        [FromBody] CreateMessageDTO data,
        [FromClaim( Name = ClaimTypes.NameIdentifier )] int uid,
        [FromClaim( Name = ClaimTypes.Role)] RoleTypes role,
        [FromClaim( Name = "companyId")] int cid
    ) {
        int? ticketCompanyId = await _ticketStorage.GetTicketCompanyId(data.TicketId);
        if (ticketCompanyId is null) return NotFound("Ticket not found.");
        if (!Authorizer.MayViewTicket(role, cid, (int)ticketCompanyId))
            return Forbid();
        Message message = new Message {
            Content = data.Content,
            Sender = uid,
            TimeSent = DateTime.UtcNow,
            TicketId = data.TicketId
        };
        await _messageStorage.AddMessage(message);
        return Ok();
    }
}
