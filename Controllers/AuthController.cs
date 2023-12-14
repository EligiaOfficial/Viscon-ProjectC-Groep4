﻿/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Viscon_ProjectC_Groep4.Dto;
using Viscon_ProjectC_Groep4.Services;

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

        [Authorize(Policy = "user")] [HttpPut("Edit")] public async Task<IActionResult> Edit(EditDto data) => 
            await _authServices.Edit(data);
        [HttpPost("Login")] public async Task<IActionResult> Login(LoginDto data) =>
            await _authServices.Login(data);
        [Authorize(Policy = "key_user")] [HttpPost("Add")] public async Task<IActionResult> Add(AddDto data) =>
            await _authServices.Add(data);
    }
}
