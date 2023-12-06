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
    public RoleTypes Role { get; set; } = RoleTypes.NONE;
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
    ADMIN = 0,
    VISCON = 1,
    KEYUSER = 2,
    USER = 3,
    NONE = 4
}
