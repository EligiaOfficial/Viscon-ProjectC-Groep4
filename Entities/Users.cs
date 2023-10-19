namespace Entities;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Users
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Usr_Id { get; set; }
    public string Usr_FirstName { get; set; }
    public string Usr_LastName { get; set; }
    public byte[] Usr_Password { get; set; }
    public byte[] Usr_PasswSalt { get; set; }
    public string Usr_Email { get; set; }
    public int Usr_Role { get; set; } = 0;
    public int Usr_PhoneNumber { get; set; }
    public string Usr_LanguagePreference { get; set; }

    [ForeignKey("Departments")]
    public int? Usr_DepId { get; set; } = 0;
    public Departments Departments { get; set; }
    
    [ForeignKey("Companies")]
    public int? Usr_CompId { get; set; } = 0;
    public Companies Companies { get; set; }
}

public enum RoleTypes : int
{
    NONE = 0,
    ADMIN = 1,
    VISCON = 2,
    KEYUSER = 3,
    USER = 4,
}
