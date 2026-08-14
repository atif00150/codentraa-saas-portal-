# ASP.NET Core 8 Web API Dockerfile for Cloud Hosting (Render / Railway / Azure / Fly.io)

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy Solution & Project files for C# restored packages caching
COPY Codentraa.sln ./
COPY src/Codentraa.Domain/Codentraa.Domain.csproj src/Codentraa.Domain/
COPY src/Codentraa.Application/Codentraa.Application.csproj src/Codentraa.Application/
COPY src/Codentraa.Infrastructure/Codentraa.Infrastructure.csproj src/Codentraa.Infrastructure/
COPY src/Codentraa.Api/Codentraa.Api.csproj src/Codentraa.Api/

RUN dotnet restore src/Codentraa.Api/Codentraa.Api.csproj

# Copy all source files and publish release build
COPY . ./
WORKDIR /app/src/Codentraa.Api
RUN dotnet publish -c Release -o /app/out

# Build Runtime Image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "Codentraa.Api.dll"]
