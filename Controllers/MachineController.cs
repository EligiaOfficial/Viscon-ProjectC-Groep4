using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Entities;
using Viscon_ProjectC_Groep4.Services;

namespace Viscon_ProjectC_Groep4.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private readonly MachineServices _machineServices;

        public MachineController(
            MachineServices machineServices
        ) {
            _machineServices = machineServices;
        }

        [Authorize(Policy = "user")]
        [HttpGet("All")]
        public async Task<ActionResult<IEnumerable<Machine>>> GetMachines() =>
            await _machineServices.GetAll();
    }
}
