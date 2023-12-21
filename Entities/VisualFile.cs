using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities
{
    public class VisualFile
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }

        // [ForeignKey("Ticket")]
        public int MessageId { get; set; }
        // public Ticket RelatedTicket { get; set; }


        public byte[] Image { get; set; }
    }
}
