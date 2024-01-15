
namespace Entities;

using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class ForgottenPassword
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public int FP_Id { get; set; }
    public DateTime FP_Expire { get; set; }
    public string FP_Token { get; set; }
}