# CODENTRAA — Multi-Tenant Enterprise SaaS Portal

> **Full-Stack Enterprise Project Management Platform** built with **Next.js 14 (App Router)** and **C# .NET 8 ASP.NET Core Clean Architecture (Onion Architecture)** with Multi-Tenant Data Isolation, SignalR WebSockets Real-Time Sync, and RBAC Security.

---

## 🌟 Executive Summary & Key Highlights

**CODENTRAA** is an enterprise-grade multi-tenant Software-as-a-Service (SaaS) agency management portal. It solves cross-organization data leakage while delivering high-speed React Server Component interfaces powered by a robust, testable C# .NET 8 backend.

- **Multi-Tenant Data Isolation**: Automated `TenantDbContextInterceptor` and EF Core Global Query Filters enforce strict `OrganizationId` scoping across all database operations.
- **Clean Architecture (Onion Architecture)**: 4 decoupled layers (`Domain`, `Application`, `Infrastructure`, `Api`) enforcing zero-dependency domain models.
- **Real-Time Collaboration**: ASP.NET Core SignalR WebSockets broadcasting live Kanban task moves and notifications across client browsers.
- **Role-Based Access Control (RBAC)**: 5 System Roles (*Owner*, *Admin*, *Manager*, *Developer*, *Client*) with granular permissions.
- **SaaS Monetization**: Subscriptions Tiers (*Free*, *Pro $29/mo*, *Enterprise $99/mo*) with usage limit enforcement meters.

---

## 🏗️ Clean System Architecture

```
                               ┌─────────────────────────────────────────┐
                               │       Next.js 14 App Router Frontend    │
                               │   TypeScript, Tailwind CSS, Lucide UI   │
                               └────────────────────┬────────────────────┘
                                                    │
                                         HTTP REST  │  WebSockets (SignalR)
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │  Codentraa.Api (ASP.NET Core Web API)   │
                               │   Controllers, Middleware, Swagger UI   │
                               └────────────────────┬────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │      Codentraa.Infrastructure           │
                               │ EF Core 8, TenantDbContextInterceptor   │
                               └────────────────────┬────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │      Codentraa.Application              │
                               │ Use Case Interfaces, ITenantService     │
                               └────────────────────┬────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │      Codentraa.Domain (Core)            │
                               │ User, Organization, Project, TaskItem   │
                               └─────────────────────────────────────────┘
```

---

## 🚀 Technology Stack

### **Backend (`/backend`)**
* **Framework**: C# .NET 8 ASP.NET Core Web API
* **Architecture**: 6-Layer Clean / Onion Architecture
* **ORM & Database**: Entity Framework Core 8 (SQL Server / In-Memory Db)
* **Multi-Tenancy**: EF Core `SaveChangesInterceptor` & Global Query Filters
* **Real-Time Engine**: ASP.NET Core SignalR WebSockets
* **Security**: JWT Bearer Tokens with Refresh Token Rotation & SHA256 Password Hashing

### **Frontend (`/frontend`)**
* **Framework**: Next.js 14 (App Router & React Server Components)
* **Styling**: Tailwind CSS & Lucide Icons
* **Real-Time Client**: `@microsoft/signalr` Client Connection Manager
* **State Management**: React State & Local Storage Tokens

---

## 🔐 Multi-Tenant Data Isolation Pattern

Multi-tenancy is enforced at the database layer using two automatic mechanisms:

1. **`ITenantEntity` Interface**: Any domain model belonging to a specific workspace implements `ITenantEntity`:
   ```csharp
   public interface ITenantEntity
   {
       public Guid OrganizationId { get; set; }
   }
   ```

2. **Automatic Query Filter**:
   ```csharp
   modelBuilder.Entity<TEntity>().HasQueryFilter(e =>
       !_tenantService.TenantId.HasValue || e.OrganizationId == _tenantService.TenantId.Value);
   ```

3. **EF Core Interceptor**: `TenantDbContextInterceptor` auto-injects `OrganizationId` and updates `CreatedAt`/`UpdatedAt` timestamps on every insert.

---

## 🛡️ Role-Based Access Control (RBAC) Matrix

| Capability / Action | Owner | Admin | Manager | Developer | Client |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Manage SaaS Billing & Subscriptions** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Invite / Remove Team Members** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Create & Archive Projects** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Create & Assign Tasks** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Update Task Status & Drag Kanban** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **View Board & Comment** | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 🌐 REST API Specifications

| Method | Endpoint URL | Auth | Action / Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/v1/auth/register` | Public | Registers User + Default Organization Workspace |
| `POST` | `/api/v1/auth/login` | Public | Authenticates user & returns signed JWT Token |
| `GET` | `/api/v1/organizations` | Bearer JWT | Lists workspaces owned/joined by user |
| `POST` | `/api/v1/organizations` | Bearer JWT | Creates new tenant workspace |
| `GET` | `/api/v1/projects` | Bearer JWT | Lists active organization projects |
| `POST` | `/api/v1/projects` | Bearer JWT | Creates new project |
| `GET` | `/api/v1/tasks` | Bearer JWT | Lists Kanban tasks for tenant |
| `POST` | `/api/v1/tasks` | Bearer JWT | Creates task item & triggers SignalR broadcast |
| `PATCH` | `/api/v1/tasks/{id}/status` | Bearer JWT | Updates task status column & broadcasts real-time move |
| `GET` | `/hubs/task` | WebSockets | SignalR WebSockets Hub endpoint |

---

## ⚡ Quick Start Guide (Local Setup)

### Prerequisites
- .NET 8 SDK
- Node.js v18+ & npm

### 1️⃣ Run Backend API Server
```powershell
dotnet run --project backend/src/Codentraa.Api/Codentraa.Api.csproj
```
- API Health Status: `http://localhost:5000`
- Swagger OpenAPI Specs: `http://localhost:5000/swagger`

### 2️⃣ Run Frontend Next.js Dev Server
```bash
cd frontend
npm install
npm run dev
```
- Web Portal UI: `http://localhost:3000`

---

## 📄 License & Ownership
Created as an Enterprise Full-Stack SaaS Portfolio Application. Confidential & Proprietary.
