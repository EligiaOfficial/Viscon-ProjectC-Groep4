using Microsoft.AspNetCore.Mvc;
using Viscon_ProjectC_Groep4.Dto;

namespace Viscon_ProjectC_Groep4.Services.AuthService
{
    public interface IAuthServices
    {

        public Task<string> Edit(EditDto data, int id);

        public Task<string> Login(LoginDto data);

        public Task Add(AddDto data);

        public Task ForgotPassword(ForgotPasswordRequest request);

        public Task ResetPassword(ResetPasswordRequest request);
    }
}