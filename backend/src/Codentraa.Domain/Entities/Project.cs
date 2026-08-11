using Codentraa.Domain.Common;

namespace Codentraa.Domain.Entities;

public class Project : BaseEntity, ITenantEntity
{
    public Guid OrganizationId { get; set; }
    public Organization? Organization { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "Active";

    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
}
