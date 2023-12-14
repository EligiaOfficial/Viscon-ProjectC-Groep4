/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
using System.Runtime.Intrinsics.Arm;
using Microsoft.AspNetCore.Mvc;
using Entities;
using Viscon_ProjectC_Groep4.Dto;
using Viscon_ProjectC_Groep4.Services;

namespace Viscon_ProjectC_Groep4.Controllers {
    
    [ApiController]
    [Route("[controller]")]
    public class DepartmentController : ControllerBase {
        
        private readonly DepartmentServices _departmentServices;

        public DepartmentController(
            DepartmentServices departmentServices
        ) {
            _departmentServices = departmentServices;
        }

        [HttpGet("All")]
        public async Task<ActionResult<IEnumerable<Machine>>> GetData() => 
            await _departmentServices.GetData();
    }
}
