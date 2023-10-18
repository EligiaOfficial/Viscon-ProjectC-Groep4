using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Microsoft.Extensions.Logging;

namespace Viscon_ProjectC_Groep4.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        
        
        

        // GET: api/Machine
        
        [HttpGet("fetchmachines")]
        public async Task<ActionResult<IEnumerable<Machines>>> GetMachines()
        {
            using (var context = new ApplicationDbContext()) {
                try
                {
                   var machines = context.Machines.Select(machines => machines.Mach_Name).ToList();
                    return Ok(machines);
                }
                catch (Exception ex)
                {
                    
                    System.Console.WriteLine(ex.Message);
                    
                    return StatusCode(500, ex.Message);
                }
            }
        }
    }
}
