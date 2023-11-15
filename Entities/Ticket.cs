namespace Entities;

using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Ticket
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Tick_Id { get; set; }

    [ForeignKey("Machines")]
    public int Tick_MachId { get; set; }
    public Machine Machines { get; set; }

    public string Tick_Title { get; set; }


    public string Tick_Description { get; set; }

    public DateTime Tick_DateCreated { get; set; }

    public int Tick_Priority { get; set; }

    public string Tick_ExpectedToBeDone { get; set; }

    public string Tick_MadeAnyChanges { get; set; }

    [ForeignKey("Departments")]
    public int Tick_DepartmentId { get; set; }
    public Department Departments { get; set; }

    [ForeignKey("Creator")] // Hier wordt de juiste navigatie-eigenschap aangegeven
    public int Tick_Creator_UserId { get; set; }
    public User Creator { get; set; }

    [ForeignKey("Helper")] // Hier wordt de juiste navigatie-eigenschap aangegeven
    public int? Tick_Helper_UserId { get; set; }
    public User Helper { get; set; }

    public string? Tick_Media { get; set; }

    public bool Tick_Resolved {get; set;}


}
