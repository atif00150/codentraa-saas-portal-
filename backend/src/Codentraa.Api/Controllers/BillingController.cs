using Codentraa.Application.Common.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Codentraa.Api.Controllers;

[ApiController]
[Route("api/v1/billing")]
public class BillingController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public BillingController(IApplicationDbContext context)
    {
        _context = context;
    }

    public record UpgradePlanRequest(string PlanTier);

    [HttpGet("plans")]
    public IActionResult GetPlans()
    {
        var plans = new[]
        {
            new
            {
                Id = "tier-free",
                Name = "Free Tier",
                Price = 0,
                BillingCycle = "Forever",
                MaxWorkspaces = 1,
                MaxUsers = 5,
                MaxProjects = 3,
                Storage = "500 MB",
                Features = new[] { "Basic Task Management", "Single Workspace", "Community Support", "Basic Audit Logs" }
            },
            new
            {
                Id = "tier-pro",
                Name = "Pro Tier",
                Price = 29,
                BillingCycle = "Per Month",
                MaxWorkspaces = 3,
                MaxUsers = 50,
                MaxProjects = 25,
                Storage = "50 GB S3 Storage",
                Features = new[] { "SignalR Real-Time Sync", "3 Workspaces", "Advanced RBAC Matrix", "Priority Support", "AWS S3 Uploads" }
            },
            new
            {
                Id = "tier-enterprise",
                Name = "Enterprise Tier",
                Price = 99,
                BillingCycle = "Per Month",
                MaxWorkspaces = 999,
                MaxUsers = 999,
                MaxProjects = 999,
                Storage = "1 TB Dedicated Cloud",
                Features = new[] { "Unlimited Workspaces & Users", "Dedicated SLA", "Full Audit Logs", "Custom Interceptors", "24/7 Dedicated Support" }
            }
        };

        return Ok(plans);
    }

    [HttpPost("subscribe")]
    public IActionResult SubscribePlan([FromBody] UpgradePlanRequest request)
    {
        return Ok(new
        {
            Message = $"Subscription upgraded to {request.PlanTier} Tier successfully.",
            Status = "Active",
            CheckoutUrl = "https://checkout.stripe.com/pay/cs_test_codentraa_enterprise",
            UpgradedAt = DateTime.UtcNow
        });
    }
}
