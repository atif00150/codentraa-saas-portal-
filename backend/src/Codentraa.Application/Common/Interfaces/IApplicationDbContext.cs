using Codentraa.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Codentraa.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }
    DbSet<Organization> Organizations { get; }
    DbSet<OrganizationUser> OrganizationUsers { get; }
    DbSet<Project> Projects { get; }
    DbSet<TaskItem> Tasks { get; }
    DbSet<TaskComment> TaskComments { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
