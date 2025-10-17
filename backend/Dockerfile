# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy csproj and restore dependencies
COPY ["backend.csproj", "./"]
RUN dotnet restore

# Copy everything else and build
COPY . .
RUN dotnet publish -c Release -o out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

# Set ASP.NET Core to listen on all network interfaces
ENV ASPNETCORE_URLS=http://+:5000

# Copy published files from build stage
COPY --from=build /app/out .

# Expose port
EXPOSE 5000

# Run the app
ENTRYPOINT ["dotnet", "backend.dll"]
