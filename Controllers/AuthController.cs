/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */

using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Viscon_ProjectC_Groep4.Dto;
using ModelBinding;
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

        [Authorize(Policy = "user")] [HttpPut("Edit")]
        public async Task<IActionResult> Edit(EditDto data, [FromClaim(Name = ClaimTypes.NameIdentifier)] int uid) {
            var token = await _authServices.Edit(data, uid);
            if (token == "No User") return BadRequest();
            return Ok(token);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDto data) {
            var token = await _authServices.Login(data);
            if (token is "User not found" or "Wrong password") return BadRequest();
            return Ok(token);
        }
        
        [Authorize(Policy = "key_user")] [HttpPost("Add")] 
        public async Task Add(AddDto data) =>
            await _authServices.Add(data);

        [HttpPost("forgot-password")]
        public async Task ForgotPassword([FromBody] ForgotPasswordRequest request) =>
            await _authServices.ForgotPassword(request);


        [HttpPost("reset-password")]
        public async Task ResetPassword([FromBody] ResetPasswordRequest request) =>
            await _authServices.ResetPassword(request);
    }
}
