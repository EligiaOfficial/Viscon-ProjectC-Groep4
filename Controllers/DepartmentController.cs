/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
using System.Runtime.Intrinsics.Arm;
using Microsoft.AspNetCore.Mvc;
using Entities;
using Viscon_ProjectC_Groep4.Dto;

namespace Viscon_ProjectC_Groep4.Controllers {
    
    [ApiController]
    [Route("[controller]")]
    public class DepartmentController : ControllerBase {
        
        private readonly IServiceProvider _services;

        public DepartmentController(IConfiguration configuration, IServiceProvider services) {
            _services = services;
        }
        
        [HttpGet("All")]
        public async Task<ActionResult<IEnumerable<Machine>>> GetData() {
            await using var context = _services.GetService<ApplicationDbContext>();
            try {
                var departments = context?.Departments.ToList();
                return Ok(departments);
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}