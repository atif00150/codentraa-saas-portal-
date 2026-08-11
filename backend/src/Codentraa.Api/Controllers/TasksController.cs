using Codentraa.Api.Hubs;
using Codentraa.Application.Common.Interfaces;
using Codentraa.Domain.Entities;
using Codentraa.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Codentraa.Api.Controllers;

[ApiController]
[Route("api/v1/tasks")]
public class TasksController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly IHubContext<TaskHub> _hubContext;

    public TasksController(IApplicationDbContext context, IHubContext<TaskHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    public record CreateTaskRequest(Guid ProjectId, string Title, string Description, TaskPriority Priority, TaskItemStatus Status);
    public record UpdateStatusRequest(TaskItemStatus Status);

    [HttpGet]
    public async Task<IActionResult> GetTasks([FromQuery] Guid? projectId)
    {
        var query = _context.Tasks.AsQueryable();

        if (projectId.HasValue)
        {
            query = query.Where(t => t.ProjectId == projectId.Value);
        }

        var tasks = await query
            .Select(t => new
            {
                t.Id,
                t.Title,
                t.Description,
                Status = t.Status.ToString(),
                Priority = t.Priority.ToString(),
                t.ProjectId,
                t.OrganizationId,
                t.CreatedAt
            })
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] CreateTaskRequest request)
    {
        var task = new TaskItem
        {
            ProjectId = request.ProjectId,
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            Status = request.Status
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        // Broadcast Real-Time WebSockets Event to All Group Subscribers
        await _hubContext.Clients.Group($"Project_{request.ProjectId}").SendAsync("TaskCreated", new
        {
            task.Id,
            task.Title,
            task.Description,
            Status = task.Status.ToString(),
            Priority = task.Priority.ToString(),
            task.ProjectId
        });

        return Ok(task);
    }

    [HttpPatch("{id:guid}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateStatusRequest request)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
        {
            return NotFound(new { Message = "Task not found." });
        }

        task.Status = request.Status;
        await _context.SaveChangesAsync();

        // Broadcast Real-Time WebSockets Event
        await _hubContext.Clients.Group($"Project_{task.ProjectId}").SendAsync("TaskMoved", new
        {
            TaskId = id,
            NewStatus = task.Status.ToString(),
            Timestamp = DateTime.UtcNow
        });

        return Ok(new { Message = "Task status updated.", TaskId = id, NewStatus = task.Status.ToString() });
    }
}
