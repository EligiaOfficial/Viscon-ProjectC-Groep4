using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Messages
{
    [Key]
    public int Msg_Id { get; set; }

    public string Msg_Message { get; set; } 

    public int Message_Sender { get; set; }

    public DateTime Msg_Date { get; set; }
}