using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Viscon_ProjectC_Groep4.Services;
using Services;
using ModelBinding;
using Entities;

namespace Controllers;

[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase {
    private readonly IUserStorage _userStorage;

    public UserController(IUserStorage userStorage) {
        _userStorage = userStorage;
    }

    [HttpGet("info")]
    public async Task<IActionResult> GetUserInfo(
        [FromQuery] int id,
        [FromClaim( Name = ClaimTypes.NameIdentifier )] int uid,
        [FromClaim( Name = ClaimTypes.Role )] RoleTypes role
    ) {
        User? user = await _userStorage.GetUser(id);
        if (user is null) return NotFound("UserNotFound");
        if (!Authorizer.MayViewUser(role, uid, user.Id)) return Forbid();

        return Ok(user);
    }

    public async Task<IActionResult> AddUser([FromBody] User user) {
        await _userStorage.AddUser(user);
        return Ok();
    }
}
