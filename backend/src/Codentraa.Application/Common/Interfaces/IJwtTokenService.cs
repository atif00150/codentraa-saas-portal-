using Codentraa.Domain.Entities;
using Codentraa.Domain.Enums;

namespace Codentraa.Application.Common.Interfaces;

public interface IJwtTokenService
{
    string GenerateAccessToken(User user, Guid organizationId, UserRole role);
    string GenerateRefreshToken();
}
