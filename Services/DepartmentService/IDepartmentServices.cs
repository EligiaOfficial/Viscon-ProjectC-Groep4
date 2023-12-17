using Entities;

namespace Viscon_ProjectC_Groep4.Services.DepartmentService {

    public interface IDepartmentServices
    {
        public Task<List<Department>> GetAll();
    }
}