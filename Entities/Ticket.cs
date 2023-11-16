namespace Entities;

using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Ticket
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [ForeignKey("Machines")]
    public int MachineId { get; set; }
    public Machine Machine { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public DateTime DateCreated { get; set; }

    public int Priority { get; set; }

    public string ExpectedToBeDone { get; set; }

    public string MadeAnyChanges { get; set; }

    [ForeignKey("Departments")]
    public int DepartmentId { get; set; }
    public Department Department { get; set; }

    [ForeignKey("Creator")] // Hier wordt de juiste navigatie-eigenschap aangegeven
    public int CreatorUserId { get; set; }
    public User Creator { get; set; }

    [ForeignKey("Helper")] // Hier wordt de juiste navigatie-eigenschap aangegeven
    public int? HelperUserId { get; set; }
    public User Helper { get; set; }

    public string? Media { get; set; }

    public bool Resolved {get; set;}
}
