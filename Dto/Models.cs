/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
using System.Reflection.Metadata;

namespace Viscon_ProjectC_Groep4.Dto;

public class AddDto
{
    public string Email { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public int Company { get; set; } = 0;

    public int Role { get; set; } = 0;

    public int Department { get; set; } = 0;
    public string Language { get; set; } = "EN";
}

public class LoginDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class fetchDto
{
    public int Id { get; set; } = 0;
}

public class MessageDto
{
    public string content { get; set; }
    public int ticketId { get; set; }
    public List<IFormFile> Images { get; set; } = new();
}

public class CreateTicketDto
{
    public string Title { get; set; } = string.Empty;
    public int Machine { get; set; }
    public string Description { get; set; } = string.Empty;
    public bool Priority { get; set; }
    public string ExpectedAction { get; set; } = string.Empty;
    public string SelfTinkering { get; set; } = string.Empty;
    public int DepartmentId { get; set; }
    public string UserEmail { get; set; } = string.Empty;

    public List<IFormFile> Images { get; set; } = new();
}

public class ChangeTicketDto
{
    public int UserId { get; set; }
    public int TicketId { get; set; }
    public int Department { get; set; }
    public bool Urgent { get; set; }
    public bool Resolved { get; set; }
    public bool Publish { get; set; }
}

public class UserDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
}

public class getUserDto
{
    public int Id { get; set; }
}

public class EditDto
{
    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Language { get; set; } = string.Empty;
}

public class GetTicketsDto
{
    public int TicketID { get; set; }
    public string Title { get; set; }
    public string Status { get; set; }
    public string Urgent { get; set; }
    public string Machine { get; set; }
    public DateTime Created { get; set; }
    public string Company { get; set; }
    public string Department { get; set; }
    public string Issuer { get; set; }
    public string? Supporter { get; set; }
}

public class ResetPasswordRequest
{
    public string Token { get; set; }
    public string NewPassword { get; set; }
}


public class ForgotPasswordRequest
{
    public string Email { get; set; }
}