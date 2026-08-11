using Codentraa.Application.Common.Interfaces;
using Codentraa.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Codentraa.Api.Controllers;

[ApiController]
[Route("api/v1/projects")]
public class ProjectsController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public ProjectsController(IApplicationDbContext context)
    {
        _context = context;
    }

    public record CreateProjectRequest(string Name, string Description);

    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        var projects = await _context.Projects
            .Select(p => new
            {
                p.Id,
                p.Name,
                p.Description,
                p.Status,
                p.CreatedAt,
                TaskCount = p.Tasks.Count,
                CompletedTaskCount = p.Tasks.Count(t => t.Status == Domain.Enums.TaskItemStatus.Done)
            })
            .ToListAsync();

        return Ok(projects);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] CreateProjectRequest request)
    {
        var project = new Project
        {
            Name = request.Name,
            Description = request.Description,
            Status = "Active"
        };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return Ok(project);
    }
}
