using Microsoft.AspNetCore.Mvc;
using Viscon_ProjectC_Groep4.Services;
using Viscon_ProjectC_Groep4.Services.UserService;

namespace Viscon_ProjectC_Groep4.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserServices _userServices;
        public UserController(UserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpGet("userdata")]
        public async Task<IActionResult> GetUser([FromQuery] int id) =>
            await _userServices.GetUser(id);
    }
}
