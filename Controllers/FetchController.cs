using Microsoft.AspNetCore.Mvc;
using Entities;

namespace Viscon_ProjectC_Groep4.Controllers {
    
    [ApiController]
    [Route("[controller]")]
    public class FetchController : ControllerBase {
        
        [HttpGet("AccountData")]
        public async Task<ActionResult<IEnumerable<Machines>>> getData() {
            await using var context = new ApplicationDbContext();
            try {
                var department = context.Departments.ToList();
                var company = context.Companies.ToList();
                return Ok(new {Companies = company, Departments = department});
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}