using Codentraa.Application.Common.Interfaces;
using Codentraa.Domain.Entities;
using Codentraa.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Codentraa.Api.Controllers;

[ApiController]
[Route("api/v1/organizations")]
public class OrganizationsController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public OrganizationsController(IApplicationDbContext context)
    {
        _context = context;
    }

    public record CreateOrgRequest(string Name, string Slug);

    [HttpGet]
    public async Task<IActionResult> GetOrganizations()
    {
        var organizations = await _context.Organizations
            .Select(o => new
            {
                o.Id,
                o.Name,
                o.Slug,
                o.SubscriptionTier,
                MemberCount = o.Members.Count,
                ProjectCount = o.Projects.Count
            })
            .ToListAsync();

        return Ok(organizations);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrganization([FromBody] CreateOrgRequest request)
    {
        var organization = new Organization
        {
            Name = request.Name,
            Slug = request.Slug.ToLower().Replace(" ", "-"),
            SubscriptionTier = "Pro"
        };

        _context.Organizations.Add(organization);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrganizations), new { id = organization.Id }, organization);
    }
}
