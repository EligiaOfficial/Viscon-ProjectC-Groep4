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

public class MachineDataDto
{
    public string Jtw { get; set; }
    public string machine { get; set; }
    public string description { get; set; }
    public string priority { get; set; }
    public string expectedAction {get; set;}
    public string selfTinkering {get; set;}
    public int departmentId { get; set; }
}