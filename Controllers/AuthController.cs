/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */

using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Viscon_ProjectC_Groep4.Dto;
using Viscon_ProjectC_Groep4.Services;
using Viscon_ProjectC_Groep4.Services.AuthService;

namespace Viscon_ProjectC_Groep4.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthServices _authServices;

        public AuthController(
            AuthServices authServices
        ) {
            _authServices = authServices;
        }

        [Authorize(Policy = "user")]
        [HttpPut("Edit")]
        public async Task<IActionResult> Edit(EditDto data)
        {
            string? id = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return await _authServices.Edit(data, int.Parse(id));
        }
        
        [HttpPost("Login")] 
        public async Task<IActionResult> Login(LoginDto data) =>
            await _authServices.Login(data);
        
        [Authorize(Policy = "key_user")] [HttpPost("Add")] 
        public async Task<IActionResult> Add(AddDto data) =>
            await _authServices.Add(data);

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request) =>
            await _authServices.ForgotPassword(request);


        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request) =>
            await _authServices.ResetPassword(request);
    }
}
