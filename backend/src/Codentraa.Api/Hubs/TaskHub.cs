using Microsoft.AspNetCore.SignalR;

namespace Codentraa.Api.Hubs;

public class TaskHub : Hub
{
    public async Task JoinProjectGroup(string projectId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"Project_{projectId}");
    }

    public async Task LeaveProjectGroup(string projectId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Project_{projectId}");
    }

    public async Task BroadcastTaskMoved(string projectId, string taskId, string newStatus)
    {
        await Clients.Group($"Project_{projectId}").SendAsync("TaskMoved", new
        {
            TaskId = taskId,
            NewStatus = newStatus,
            MovedByConnectionId = Context.ConnectionId,
            Timestamp = DateTime.UtcNow
        });
    }
}
