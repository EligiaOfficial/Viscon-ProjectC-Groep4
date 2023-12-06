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
        
        private readonly ApplicationDbContext _dbContext;

        public DepartmentController(ApplicationDbContext dbContext) {
            _dbContext = dbContext;
        }
        
        [HttpGet("All")]
        public async Task<ActionResult<IEnumerable<Machine>>> GetData() {
            var departments = _dbContext.Departments.ToList();
            return Ok(departments);
        }
    }
}
