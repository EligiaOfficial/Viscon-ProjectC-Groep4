/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */

using System.Security.Claims;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModelBinding;
using Viscon_ProjectC_Groep4.Dto;
using Viscon_ProjectC_Groep4.Services.AuthService;

namespace Viscon_ProjectC_Groep4.Services.TicketService
{
    public interface ITicketServices
    {
        public Task<IActionResult> AddMessage(
            MessageDto data,
            [FromClaim(Name = ClaimTypes.NameIdentifier)]
            int uid
        );

        [HttpGet("getimage/{ticketId}")]
        public IActionResult GetImage(int ticketId);

        public Task<ActionResult<Ticket>> CreateTicket([FromForm] CreateTicketDto data);

        public Task<ActionResult<Ticket>> CreateTicketForSomeone([FromForm] CreateTicketDto data);

        public Task<IActionResult> GetUser(getUserDto data);

        public Task<ActionResult> GetTicketData([FromQuery] int id);

        public Task<IActionResult> GetTickets();

        public Task<IActionResult> ChangeTicketDepartment(ChangeTicketDto data);

        public Task<IActionResult> Claim(int id);
    }
}