using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Users
{
    [Key]
    public int Usr_Id { get; set; }

    public string Usr_FirstName { get; set; }
    public string Usr_LastName { get; set; }
    public string Usr_Password { get; set; }
    public string Usr_Email { get; set; }
    public int Usr_Level { get; set; }
    public string Usr_Username { get; set; }
    public string Usr_Role {get; set;}
    public int Usr_PhoneNumber { get; set; }
    public string Usr_LanguagePreference { get; set; }

    [ForeignKey("Departments")]
    public int Usr_DepId { get; set; }
    public Departments Departments { get; set; }
}