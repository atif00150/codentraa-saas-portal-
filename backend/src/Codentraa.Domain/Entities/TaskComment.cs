using Codentraa.Domain.Common;

namespace Codentraa.Domain.Entities;

public class TaskComment : BaseEntity, ITenantEntity
{
    public Guid OrganizationId { get; set; }
    public Organization? Organization { get; set; }

    public Guid TaskItemId { get; set; }
    public TaskItem? TaskItem { get; set; }

    public Guid AuthorId { get; set; }
    public User? Author { get; set; }

    public string Content { get; set; } = string.Empty;
}
