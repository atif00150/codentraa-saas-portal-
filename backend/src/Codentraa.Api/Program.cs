using System.Text;
using Codentraa.Api.Controllers;
using Codentraa.Api.Hubs;
using Codentraa.Application.Common.Interfaces;
using Codentraa.Domain.Entities;
using Codentraa.Domain.Enums;
using Codentraa.Infrastructure.Persistence;
using Codentraa.Infrastructure.Persistence.Interceptors;
using Codentraa.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add Services & Controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// SignalR Real-Time WebSockets Registration
builder.Services.AddSignalR();

// Swagger OpenAPI Setup
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "CODENTRAA Enterprise Multi-Tenant API", Version = "v1" });
});

// Scoped Tenant Resolution & Infrastructure Services
builder.Services.AddScoped<ITenantService, TenantService>();
builder.Services.AddScoped<TenantDbContextInterceptor>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

// Entity Framework Core 8 Registration (In-Memory Database for rapid testing & isolation)
builder.Services.AddDbContext<ApplicationDbContext>((sp, options) =>
{
    var interceptor = sp.GetRequiredService<TenantDbContextInterceptor>();
    options.UseInMemoryDatabase("CodentraaDb")
           .AddInterceptors(interceptor);
});

// Bind IApplicationDbContext Interface to ApplicationDbContext
builder.Services.AddScoped<IApplicationDbContext>(sp => sp.GetRequiredService<ApplicationDbContext>());

// JWT Authentication Configuration
var secretKey = builder.Configuration["JwtSettings:Secret"] ?? "Codentraa_Super_Secret_JWT_Key_2026_Enterprise_SaaS";
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"] ?? "Codentraa.Api",
        ValidAudience = builder.Configuration["JwtSettings:Audience"] ?? "Codentraa.Frontend",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
    };
});

// CORS Policy for Next.js Frontend (with WebSockets Credentials Support)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Seed Default User & Organization on Startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    if (!db.Users.Any(u => u.Email == "test@codentraa.com"))
    {
        var user = new User
        {
            Email = "test@codentraa.com",
            PasswordHash = AuthController.HashPassword("Password123!"),
            FirstName = "Atif",
            LastName = "Mughal",
            IsEmailVerified = true
        };
        db.Users.Add(user);

        var org = new Organization
        {
            Name = "Codentraa Agency",
            Slug = "codentraa-agency",
            OwnerId = user.Id,
            SubscriptionTier = "Pro"
        };
        db.Organizations.Add(org);

        var orgUser = new OrganizationUser
        {
            OrganizationId = org.Id,
            UserId = user.Id,
            Role = UserRole.Owner
        };
        db.OrganizationUsers.Add(orgUser);

        db.SaveChanges();
    }
}

// Configure HTTP Middleware Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Map SignalR WebSockets Hub Endpoint
app.MapHub<TaskHub>("/hubs/task");

app.MapGet("/", () => Results.Ok(new { System = "CODENTRAA Master Enterprise API", Version = "1.0.0", Status = "Healthy", Docs = "/swagger", WebSockets = "/hubs/task" }));

app.Run();
