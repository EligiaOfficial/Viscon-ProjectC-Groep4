/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */

using Entities;
using Microsoft.AspNetCore.Mvc;

namespace Viscon_ProjectC_Groep4.Services.CompanyService {
    
    public class CompanyServices : ControllerBase {
        
        private readonly ApplicationDbContext _dbContext;

        public CompanyServices(ApplicationDbContext dbContext) {
            _dbContext = dbContext;
        }
        
        public async Task<List<Company>> GetData() {
            var companies = _dbContext.Companies.ToList();
            return companies;
        }
    }
}