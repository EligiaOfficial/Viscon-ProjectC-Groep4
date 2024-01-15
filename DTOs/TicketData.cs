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
    public string CompanyName { get; set; }
    public string CreatorName { get; set; }
    public string MachineName { get; set; }
    public string DepartmentName { get; set; }
    public string HelperName { get; set; }
    public bool Published { get; set; }
    [JsonIgnore]
    public int CreatorCompanyId { get; set; }
}
