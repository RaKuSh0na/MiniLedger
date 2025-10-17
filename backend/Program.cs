using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext (SQLite)
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Add services to the container.

builder.Services.AddControllers();


var app = builder.Build();

// middleware Pipeline  
app.UseHttpsRedirection();
app.UseAuthorization();

//Map Controllers Routes 
app.MapControllers();

// Run the application
app.Run();
