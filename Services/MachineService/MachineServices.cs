/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */

using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Viscon_ProjectC_Groep4.Services.MachineService {
    
    public class MachineServices : IMachineServices {
        
        private readonly ApplicationDbContext _dbContext;

        public MachineServices(ApplicationDbContext dbContext) {
            _dbContext = dbContext;
        }
        
        public async Task<List<Machine>> GetAll() =>
            await _dbContext.Machines.ToListAsync();
    }
}