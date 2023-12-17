/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
using Microsoft.AspNetCore.Mvc;
using Entities;

namespace Viscon_ProjectC_Groep4.Services {
    
    public class MachineServices : ControllerBase {
        
        private readonly ApplicationDbContext _dbContext;

        public MachineServices(ApplicationDbContext dbContext) {
            _dbContext = dbContext;
        }
        
        public async Task<ActionResult<IEnumerable<Machine>>> GetAll() {
            var departments = _dbContext.Departments.ToList();
            return Ok(departments);
        }
    }
}