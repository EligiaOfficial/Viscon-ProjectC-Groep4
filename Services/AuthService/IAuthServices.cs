using Microsoft.AspNetCore.Mvc;
using Viscon_ProjectC_Groep4.Dto;

namespace Viscon_ProjectC_Groep4.Services.AuthService
{
    public interface IAuthServices
    {

        public Task<IActionResult> Edit(EditDto data, int id);

        public Task<IActionResult> Login(LoginDto data);

        public Task<IActionResult> Add(AddDto data);

        public Task<IActionResult> ForgotPassword(ForgotPasswordRequest request);

        public Task<IActionResult> ResetPassword(ResetPasswordRequest request);
    }
}