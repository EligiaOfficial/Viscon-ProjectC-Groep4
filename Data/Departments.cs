using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Departments
{
    [Key]
    public int Dep_Id { get; set; }

    public string Dep_Speciality {get; set;}
}