using Codentraa.Application.Common.Interfaces;
using Codentraa.Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Codentraa.Infrastructure.Persistence.Interceptors;

public class TenantDbContextInterceptor : SaveChangesInterceptor
{
    private readonly ITenantService _tenantService;

    public TenantDbContextInterceptor(ITenantService tenantService)
    {
        _tenantService = tenantService;
    }

    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        UpdateEntities(eventData.Context);
        return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
    {
        UpdateEntities(eventData.Context);
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private void UpdateEntities(DbContext? context)
    {
        if (context == null) return;

        var tenantId = _tenantService.TenantId;

        foreach (var entry in context.ChangeTracker.Entries())
        {
            // Auto Audit Timestamps
            if (entry.Entity is BaseEntity baseEntity)
            {
                if (entry.State == EntityState.Added)
                {
                    baseEntity.CreatedAt = DateTime.UtcNow;
                }
                else if (entry.State == EntityState.Modified)
                {
                    baseEntity.UpdatedAt = DateTime.UtcNow;
                }
            }

            // Auto Multi-Tenant Assignment
            if (entry.Entity is ITenantEntity tenantEntity && entry.State == EntityState.Added)
            {
                if (tenantId.HasValue && tenantEntity.OrganizationId == Guid.Empty)
                {
                    tenantEntity.OrganizationId = tenantId.Value;
                }
            }
        }
    }
}
