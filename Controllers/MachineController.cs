using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
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
        private readonly ApplicationDbContext _dbContext;

        public MachineController(
            ILogger<FetchController> logger, ApplicationDbContext dbContext
        ) {
            _logger = logger;
            _dbContext = dbContext;
        }

        // GET: api/Machine
        [Authorize(Policy = "user")]
        [HttpGet("fetchmachines")]
        public async Task<ActionResult<IEnumerable<Machine>>> GetMachines() {
            var machines = _dbContext.Machines.Select(machines => machines.Name).ToList();
            return Ok(machines);
        }
    }
}
