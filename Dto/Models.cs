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

    public int Phone { get; set; } = 0;

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
    public int sender { get; set; }
}

public class TicketDto
{
    public string title { get; set; }
    public string machine { get; set; }
    public string description { get; set; }
    public bool priority { get; set; }
    public string expectedAction { get; set; }
    public string selfTinkering { get; set; }
    public int departmentId { get; set; }
    public string? userEmail { get; set; }

    public IFormFile? image { get; set; }
}

public class ChangeTicketDto
{
    public int id { get; set; }
    public int department { get; set; }
    public bool urgent { get; set; }
    public bool resolved { get; set; }
    public bool publish { get; set; }
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

    public int Phone { get; set; } = 0;

    public string Language { get; set; } = string.Empty;
}

public class GetTicketsDto
{
    public int TicketID { get; set; }
    public string Status { get; set; }
    public string Urgent { get; set; }
    public string Description { get; set; }
    public string Machine { get; set; }
    public DateTime Created { get; set; }
    public string ETC { get; set; } //Expected time of completion
    public string Department { get; set; }
    public string Issuer { get; set; }
    public string? Supporter { get; set; }
}
