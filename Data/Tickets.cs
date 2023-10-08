using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Tickets
{
    [Key]
    public int Tick_Id { get; set; }

    [ForeignKey("Machines")]
    public int Tick_MachId { get; set; }
    public Machines Machines { get; set; }

    public string Tick_Title { get; set; }


    public string Tick_Description { get; set; }

    public DateTime Tick_DateCreated { get; set; }

    public int Tick_Priority { get; set; }

    [ForeignKey("Departments")]
    public int Tick_DepartmentId { get; set; }
    public Departments Departments { get; set; }

    [ForeignKey("Messages")]
    public int Tick_MessageId { get; set; }
    public Messages Messages { get; set; }  

    [ForeignKey("Tick_Creator_UserId")] // Hier wordt de juiste navigatie-eigenschap aangegeven
    public Users Creator { get; set; }

    [ForeignKey("Tick_Helper_UserId")] // Hier wordt de juiste navigatie-eigenschap aangegeven
    public Users Helper { get; set; }

    public string Tick_Media { get; set; }

    public bool Tick_Resolved {get; set;}


}