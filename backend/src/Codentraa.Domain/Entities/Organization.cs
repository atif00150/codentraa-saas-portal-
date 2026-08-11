using Codentraa.Domain.Common;

namespace Codentraa.Domain.Entities;

public class Organization : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public Guid OwnerId { get; set; }
    public User? Owner { get; set; }
    public string SubscriptionTier { get; set; } = "Free"; // Free, Pro, Enterprise

    public ICollection<OrganizationUser> Members { get; set; } = new List<OrganizationUser>();
    public ICollection<Project> Projects { get; set; } = new List<Project>();
}
