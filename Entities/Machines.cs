namespace Entities;

using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Machines
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Mach_Id { get; set; }

    public string Mach_Name { get; set; }

    public string Mach_Type { get; set; }
}
