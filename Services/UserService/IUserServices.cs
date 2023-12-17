/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Viscon_ProjectC_Groep4.Dto;

namespace Viscon_ProjectC_Groep4.Services.UserService {
    
    public interface IUserServices
    {
        public Task<IActionResult> GetUser([FromQuery] int id);
    }
}