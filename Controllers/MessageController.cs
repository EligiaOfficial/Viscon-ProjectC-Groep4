using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Services;
using Entities;
using ModelBinding;
using DTOs;

namespace Controllers;

[Route("[controllers]")]
[ApiController]
class MessageController : ControllerBase {
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
    public async Task<IActionResult> GetMessages(
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

    [HttpPost("create")]
    public async Task<IActionResult> CreateMessage(
        [FromBody] MessageDataDTO data,
        [FromClaim( Name = ClaimTypes.NameIdentifier )] int uid,
        [FromClaim( Name = ClaimTypes.Role)] RoleTypes role,
        [FromClaim( Name = "companyId")] int cid
    ) {
        int? ticketCompanyId = await _ticketStorage.GetTicketCompanyId(data.RelatedTicketId);
        if (ticketCompanyId is null) return NotFound("Ticket not found.");
        if (!Authorizer.MayViewTicket(role, cid, (int)ticketCompanyId))
            return Forbid();
        Message message = new Message {
            Content = data.Content,
            Sender = uid,
            TimeSent = DateTime.Now,
            TicketId = data.RelatedTicketId
        };
        await _messageStorage.AddMessage(message);
        return Ok();
    }
}
