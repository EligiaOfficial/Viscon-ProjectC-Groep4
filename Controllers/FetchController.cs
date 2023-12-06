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
    public class FetchController : ControllerBase {
        
        private readonly ApplicationDbContext _dbContext;

        public FetchController(ApplicationDbContext dbContext) {
            _dbContext = dbContext;
        }
        
        [HttpGet("AccountData")]
        public async Task<ActionResult<IEnumerable<Machine>>> GetData() {
            var department = _dbContext.Departments.ToList();
            var company = _dbContext?.Companies.ToList();
            return Ok(new {Companies = company, Departments = department});
        }
    }
}
