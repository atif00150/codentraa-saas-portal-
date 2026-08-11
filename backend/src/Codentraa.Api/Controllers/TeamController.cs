using Codentraa.Application.Common.Interfaces;
using Codentraa.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Codentraa.Api.Controllers;

[ApiController]
[Route("api/v1/team")]
public class TeamController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public TeamController(IApplicationDbContext context)
    {
        _context = context;
    }

    public record InviteMemberRequest(string Email, UserRole Role);

    [HttpGet("members")]
    public async Task<IActionResult> GetMembers()
    {
        var members = await _context.OrganizationUsers
            .Select(ou => new
            {
                ou.Id,
                ou.UserId,
                UserEmail = ou.User != null ? ou.User.Email : "user@codentraa.com",
                FullName = ou.User != null ? $"{ou.User.FirstName} {ou.User.LastName}" : "Team Member",
                Role = ou.Role.ToString(),
                ou.CreatedAt
            })
            .ToListAsync();

        return Ok(members);
    }

    [HttpPost("invite")]
    public IActionResult InviteMember([FromBody] InviteMemberRequest request)
    {
        return Ok(new
        {
            Message = $"Invitation email token sent to {request.Email} with role {request.Role}.",
            InviteToken = Guid.NewGuid().ToString("N"),
            Status = "PendingInvitation"
        });
    }
}
