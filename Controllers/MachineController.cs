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
        
        private readonly ILogger<FetchController> _logger;
        private readonly IServiceProvider _services;

        public MachineController(ILogger<FetchController> logger, IServiceProvider services) {
            _logger = logger;
            _services = services;
        }
        

        // GET: api/Machine
        
        [HttpGet("fetchmachines")]
        public async Task<ActionResult<IEnumerable<Machine>>> GetMachines() {
            await using var context = _services.GetService<ApplicationDbContext>();;
            try
            {
                var machines = context!.Machines.Select(machines => machines.Name).ToList();
                return Ok(machines);
            }
            catch (Exception ex)
            {
                    
                _logger.LogError(ex.Message);
                    
                return StatusCode(500, ex.Message);
            }
        }
    }
}
