namespace Entities;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public byte[] Password { get; set; }
    public byte[] PasswSalt { get; set; }
    public string Email { get; set; }
    public int Role { get; set; } = 0;
    public int PhoneNumber { get; set; }
    public string LanguagePreference { get; set; }

    [ForeignKey("Departments")]
    public int? DepartmentId { get; set; } = 0;
    public Department Department { get; set; }

    [ForeignKey("Companies")]
    public int? CompanyId { get; set; } = 0;
    public Company Company { get; set; }
}

public enum RoleTypes : int
{
    NONE = 0,
    ADMIN = 1,
    VISCON = 2,
    KEYUSER = 3,
    USER = 4,
}
