/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */

using Entities;
using Microsoft.AspNetCore.Mvc;

namespace Viscon_ProjectC_Groep4.Services.MachineService {
    
    public class MachineServices : ControllerBase, IMachineServices {
        
        private readonly ApplicationDbContext _dbContext;

        public MachineServices(ApplicationDbContext dbContext) {
            _dbContext = dbContext;
        }
        
        public async Task<ActionResult<IEnumerable<Machine>>> GetAll() {
            var machines = _dbContext.Machines.ToList();
            return Ok(machines);
        }
    }
}