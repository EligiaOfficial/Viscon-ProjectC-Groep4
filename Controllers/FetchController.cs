/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
using Microsoft.AspNetCore.Mvc;
using Viscon_ProjectC_Groep4.Services;

namespace Viscon_ProjectC_Groep4.Controllers {
    
    [ApiController]
    [Route("[controller]")]
    public class FetchController : ControllerBase {
        
        private readonly DepartmentServices _departmentServices;
        private readonly CompanyServices _companyServices;

        public FetchController(
            DepartmentServices departmentServices,
            CompanyServices companyServices
        ) {
            _departmentServices = departmentServices;
            _companyServices = companyServices;
        }
        
        [HttpGet("AccountData")]
        public async Task<ActionResult> GetData() {
            var department = _departmentServices.GetAll();
            var company = _companyServices.GetData();
            return Ok(new {Companies = company, Departments = department});
        }
    }
}
