using System.Security.Cryptography;
using System.Text;
using Codentraa.Application.Common.Interfaces;
using Codentraa.Domain.Entities;
using Codentraa.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Codentraa.Api.Controllers;

[ApiController]
[Route("api/v1/auth")]
public class AuthController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly IJwtTokenService _jwtTokenService;

    public AuthController(IApplicationDbContext context, IJwtTokenService jwtTokenService)
    {
        _context = context;
        _jwtTokenService = jwtTokenService;
    }

    public record RegisterRequest(string Email, string Password, string FirstName, string LastName, string OrganizationName);
    public record LoginRequest(string Email, string Password);
    public record ForgotPasswordRequest(string Email);
    public record AuthResponse(string Token, string RefreshToken, string UserEmail, string FullName, Guid OrganizationId, string OrganizationName, string Role);

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.Email.ToLower() == request.Email.ToLower()))
        {
            return BadRequest(new { Message = "User with this email already exists." });
        }

        // 1. Create User
        var user = new User
        {
            Email = request.Email,
            PasswordHash = HashPassword(request.Password),
            FirstName = request.FirstName,
            LastName = request.LastName,
            IsEmailVerified = true
        };
        _context.Users.Add(user);

        // 2. Create Default Tenant Organization
        var slug = request.OrganizationName.ToLower().Replace(" ", "-");
        var organization = new Organization
        {
            Name = request.OrganizationName,
            Slug = slug,
            OwnerId = user.Id,
            SubscriptionTier = "Pro"
        };
        _context.Organizations.Add(organization);

        // 3. Bind User as Owner of Organization
        var orgUser = new OrganizationUser
        {
            OrganizationId = organization.Id,
            UserId = user.Id,
            Role = UserRole.Owner
        };
        _context.OrganizationUsers.Add(orgUser);

        await _context.SaveChangesAsync();

        var token = _jwtTokenService.GenerateAccessToken(user, organization.Id, UserRole.Owner);
        var refreshToken = _jwtTokenService.GenerateRefreshToken();

        return Ok(new AuthResponse(
            token,
            refreshToken,
            user.Email,
            $"{user.FirstName} {user.LastName}",
            organization.Id,
            organization.Name,
            UserRole.Owner.ToString()
        ));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());
        if (user == null || user.PasswordHash != HashPassword(request.Password))
        {
            return Unauthorized(new { Message = "Invalid email or password." });
        }

        // Fetch User's Primary Organization Membership ignoring tenant query filter on unauthenticated login
        var orgUser = await _context.OrganizationUsers
            .IgnoreQueryFilters()
            .Include(ou => ou.Organization)
            .FirstOrDefaultAsync(ou => ou.UserId == user.Id);

        if (orgUser == null || orgUser.Organization == null)
        {
            return BadRequest(new { Message = "User has no assigned workspace." });
        }

        var token = _jwtTokenService.GenerateAccessToken(user, orgUser.OrganizationId, orgUser.Role);
        var refreshToken = _jwtTokenService.GenerateRefreshToken();

        return Ok(new AuthResponse(
            token,
            refreshToken,
            user.Email,
            $"{user.FirstName} {user.LastName}",
            orgUser.OrganizationId,
            orgUser.Organization.Name,
            orgUser.Role.ToString()
        ));
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());
        if (user == null)
        {
            return NotFound(new { Message = "No user found with this email address." });
        }

        return Ok(new
        {
            Message = $"Password reset link sent to {request.Email}.",
            ResetToken = Guid.NewGuid().ToString("N"),
            Status = "Success"
        });
    }

    public static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(password);
        var hash = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hash);
    }
}
