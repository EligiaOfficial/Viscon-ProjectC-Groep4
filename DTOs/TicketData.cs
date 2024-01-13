using System.Text.Json.Serialization;

namespace DTOs;

public struct TicketDataDTO {
    public string Title;
    public string Description;
    public string MadeAnyChanges;
    public string ExpectedToBeDone;
    public bool Urgent;
    public bool Resolved;
    public DateTime DateCreated;
    [JsonIgnore]
    public int CreatorCompanyId;
}
