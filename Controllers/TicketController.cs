using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Microsoft.Extensions.Logging;
public class TicketRequestModel
{
    public int MachineId { get; set; }
    public string MachineName { get; set; }
    public string Description { get; set; }
    public string ExpectedAction { get; set; }
    public string SelfTinkering { get; set; }
    public int Priority { get; set; }
    
}

namespace Viscon_ProjectC_Groep4.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        
        
        

        

        [HttpPost("create")]
        public async Task<IActionResult> CreateTicket([FromForm] TicketRequestModel model)
        {
            using (var context = new ApplicationDbContext()) {
                // Create a new Ticket instance
                var ticket = new Tickets
                {
                    // Set properties from the `model` object
                    Tick_MachId = 1,
                    Tick_Creator_UserId = 1,
                    Tick_Helper_UserId = 1,
                    Tick_Media = null,
                    Tick_Resolved = false,
                    Tick_Title = $"{model.MachineName} {DateTime.UtcNow}", // Create the title as required
                    Tick_Description = model.Description,
                    Tick_DateCreated = DateTime.UtcNow,
                    Tick_Priority = model.Priority,
                    Tick_ExpectedToBeDone = model.ExpectedAction,
                    Tick_MadeAnyChanges = model.SelfTinkering,
                    // Other properties as needed
                };

                // Save the ticket to the database
                context.Tickets.Add(ticket);
                await context.SaveChangesAsync();
                return CreatedAtAction("GetTicket", new { id = ticket.Tick_Id }, ticket);
            }

            

    }
};
}
