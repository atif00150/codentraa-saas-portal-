using Codentraa.Application.Common.Interfaces;

namespace Codentraa.Infrastructure.Services;

public class TenantService : ITenantService
{
    public Guid? TenantId { get; private set; }

    public void SetTenant(Guid tenantId)
    {
        TenantId = tenantId;
    }
}
