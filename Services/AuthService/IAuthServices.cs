using Microsoft.AspNetCore.Mvc;
using Viscon_ProjectC_Groep4.Dto;

namespace Viscon_ProjectC_Groep4.Services.AuthService
{
    public interface IAuthServices
    {

        public Task<IActionResult> Edit(EditDto data);

        public Task<IActionResult> Login(LoginDto data);

        public Task<IActionResult> Add(AddDto data);

        public Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request);

        public Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request);
    }
}