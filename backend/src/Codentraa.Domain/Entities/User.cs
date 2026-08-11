using Codentraa.Domain.Common;

namespace Codentraa.Domain.Entities;

public class User : BaseEntity
{
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public bool IsEmailVerified { get; set; } = false;
    public string? AvatarUrl { get; set; }

    public ICollection<OrganizationUser> OrganizationUsers { get; set; } = new List<OrganizationUser>();
}
