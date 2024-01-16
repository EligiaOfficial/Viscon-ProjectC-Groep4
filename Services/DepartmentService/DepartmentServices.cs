/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */

using Entities;
using Microsoft.AspNetCore.Mvc;

namespace Viscon_ProjectC_Groep4.Services.DepartmentService {

    public class DepartmentServices : ControllerBase, IDepartmentServices {
        
        private readonly ApplicationDbContext _dbContext;

        public DepartmentServices(ApplicationDbContext dbContext) {
            _dbContext = dbContext;
        }
        
        public async Task<ActionResult<IEnumerable<Department>>> GetAll() {
            var departments = _dbContext.Departments.ToList();
            return departments;
        }
    }
}