using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities; // Make sure this namespace exists
using Microsoft.Extensions.Logging;

namespace Viscon_ProjectC_Groep4.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        [HttpPost("createticket")]
        public async Task<ActionResult<Tickets>> CreateTicket([FromBody] MachineData data)
        {
            using (var context = new ApplicationDbContext())
            {
                try
                {
                    var ticket = new Tickets();
                    ticket.Tick_MachId = context.Machines.Where(m => m.Mach_Name == data.machine).Select(m => m.Mach_Id).FirstOrDefault();
                    ticket.Tick_Title = $"{DateTime.UtcNow} Prio: {data.priority}, {data.machine}";
                    ticket.Tick_Description = data.description;
                    ticket.Tick_DateCreated = DateTime.UtcNow;
                    ticket.Tick_Priority = 1;
                    ticket.Tick_ExpectedToBeDone = data.expectedAction;
                    ticket.Tick_MadeAnyChanges = data.selfTinkering;
                    ticket.Tick_DepartmentId = 1;
                    ticket.Tick_MessageId = 1;
                    ticket.Tick_Creator_UserId = 1;
                    ticket.Tick_Helper_UserId = 1;
                    ticket.Tick_Media = "a";
                    ticket.Tick_Resolved = false;
                    context.Tickets.Add(ticket);
                    context.SaveChanges();
                    return Ok(ticket);
                }
                catch (Exception ex)
                {
                    if (ex.InnerException != null)
                    {
                        // Log or print the inner exception message
                        System.Console.WriteLine("Inner Exception: " + ex.InnerException.Message);
                    }
                    System.Console.WriteLine(ex.Message);
                    return StatusCode(500, ex.Message);
                }
            }
        }
    }
}

public class MachineData
{
    public string machine { get; set; }
    public string description { get; set; }
    public string priority { get; set; }
    
    public string expectedAction {get; set;}
    public string selfTinkering {get; set;}
}
    
