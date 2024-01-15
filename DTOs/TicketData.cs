using System.Text.Json.Serialization;

namespace DTOs;

public class TicketDataDTO {
    public string Title { get; set; }
    public string Description { get; set; }
    public string MadeAnyChanges { get; set; }
    public string ExpectedToBeDone { get; set; }
    public bool Urgent { get; set; }
    public bool Resolved { get; set; }
    public DateTime DateCreated { get; set; }
    [JsonIgnore]
    public int CreatorCompanyId { get; set; }
}
