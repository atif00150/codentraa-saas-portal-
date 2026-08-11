using Codentraa.Domain.Common;
using Codentraa.Domain.Enums;

namespace Codentraa.Domain.Entities;

public class TaskItem : BaseEntity, ITenantEntity
{
    public Guid OrganizationId { get; set; }
    public Organization? Organization { get; set; }

    public Guid ProjectId { get; set; }
    public Project? Project { get; set; }

    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public TaskItemStatus Status { get; set; } = TaskItemStatus.Backlog;
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;

    public Guid? AssigneeId { get; set; }
    public User? Assignee { get; set; }

    public ICollection<TaskComment> Comments { get; set; } = new List<TaskComment>();
}
