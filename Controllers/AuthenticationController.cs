using Microsoft.AspNetCore.Mvc;
using Services;
using Viscon_ProjectC_Groep4.Services;
using Entities;

namespace Controllers;

[Route("[controller]")]
[ApiController]
public class AuthorizationController : ControllerBase {
    private readonly IUserStorage _userStorage;
    private readonly Authenticator _authenticator;

    public AuthorizationController(
        IUserStorage userStorage,
        Authenticator authenticator
    ) {
        _userStorage = userStorage;
        _authenticator = authenticator;
    }

    [HttpPost("login")]
    public async Task<IActionResult> login(Credentials credentials) {
        User? user = await _userStorage.GetUserBy(
            u => u.Email == credentials.Email
        );
        // Also return a 404 if password does not match,
        // to avoid hinting a valid email to an attacker.
        if (user is null || Authenticator.VerifyPassword(
            credentials.Password, user.Password, user.PasswSalt
        )) return NotFound();
        return Ok(_authenticator.CreateToken(user));
    }

}

public struct Credentials {
    public string Email;
    public string Password;
}
