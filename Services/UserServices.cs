/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Viscon_ProjectC_Groep4.Dto;

namespace Viscon_ProjectC_Groep4.Services {
    
    public class UserServices : ControllerBase {
        
        private readonly ApplicationDbContext _dbContext;

        public UserServices(ApplicationDbContext dbContext) {
            _dbContext = dbContext;
        }
        
        public async Task<IActionResult> GetUser([FromQuery] int id)
        {
            UserDto? user = await _dbContext.Users
                .Where(user => user.Id == id)
                .Select(result => new UserDto
                {
                    FirstName = result.FirstName,
                    LastName = result.LastName,
                    Email = result.Email,
                    Role = result.Role.ToString() ?? "N/A"
                })
                .FirstOrDefaultAsync();
            return Ok(user);
        }
    }
}