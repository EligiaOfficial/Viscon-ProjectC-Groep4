/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
using Microsoft.AspNetCore.Mvc;
using Entities;

namespace Viscon_ProjectC_Groep4.Services {

    public class DepartmentServices : ControllerBase {
        
        private readonly ApplicationDbContext _dbContext;

        public DepartmentServices(ApplicationDbContext dbContext) {
            _dbContext = dbContext;
        }
        
        public async Task<List<Department>> GetAll() {
            var departments = _dbContext.Departments.ToList();
            return departments;
        }
    }
}