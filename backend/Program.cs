using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// DataBase Connection
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

// Add services to the container
builder.Services.AddControllers();

var app = builder.Build();

// Use CORS middleware
app.UseCors();

// Apply migrations automatically
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DataContext>();
    db.Database.Migrate(); // ensures DB and tables are created
}

// Middleware pipeline
app.UseHttpsRedirection();
app.UseAuthorization();

// Map controllers routes
app.MapControllers();

// Run the application
app.Run();
