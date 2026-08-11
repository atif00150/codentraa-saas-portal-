using Codentraa.Domain.Common;
using Codentraa.Domain.Enums;

namespace Codentraa.Domain.Entities;

public class OrganizationUser : BaseEntity, ITenantEntity
{
    public Guid OrganizationId { get; set; }
    public Organization? Organization { get; set; }

    public Guid UserId { get; set; }
    public User? User { get; set; }

    public UserRole Role { get; set; } = UserRole.Developer;
}
