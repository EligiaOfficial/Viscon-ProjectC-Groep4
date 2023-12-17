using Entities;
using Microsoft.AspNetCore.Mvc;

namespace Viscon_ProjectC_Groep4.Services.CompanyService {
    
    public interface ICompanyServices
    {
        public Task<ActionResult<IEnumerable<Company>>> GetData();
    }
}