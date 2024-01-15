using Entities;

namespace DTOs;

public class MessageDataDTO {
    public string Content { get; set; }
    public int SenderId { get; set; }
    public string SenderName { get; set; }
    public DateTime TimeSent { get; set; }
    public List<VisualFile> VisualFiles { get; set; }
    public int RelatedTicketId { get; set; }
}
