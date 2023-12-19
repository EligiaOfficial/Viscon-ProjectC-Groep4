/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */

using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Viscon_ProjectC_Groep4.Services.DepartmentService {

    public class DepartmentServices : ControllerBase, IDepartmentServices {

        private readonly ApplicationDbContext _dbContext;

        public DepartmentServices(ApplicationDbContext dbContext) {
            _dbContext = dbContext;
        }

        public async Task<List<Department>> GetAll() =>
            await _dbContext.Departments.ToListAsync();
    }
}