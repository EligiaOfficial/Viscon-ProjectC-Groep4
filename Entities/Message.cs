namespace Entities;

using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Message
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string Content { get; set; }

    public int Sender { get; set; }

    public DateTime TimeSent { get; set; }

    [ForeignKey("Tickets")]
    public int TickId { get; set; }
    public Ticket Tickets { get; set; }  
    
    public DateTime date { get; set; }

}
