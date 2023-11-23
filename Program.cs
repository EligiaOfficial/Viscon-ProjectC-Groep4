using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Viscon_ProjectC_Groep4;
using Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
    .AddDbContext<ApplicationDbContext>(
        options => options.UseNpgsql(
            builder.Configuration["database:connection_string"]
        )
    )
    .AddSingleton<Authenticator>();
builder.Services.AddControllersWithViews();
builder.Logging.AddConsole();

var app = builder.Build();

var scopeFactory = app.Services.GetService<IServiceScopeFactory>();
using (IServiceScope scope = scopeFactory.CreateScope()) {
    var db = scope.ServiceProvider.GetService<ApplicationDbContext>();
    db.SeedDb();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();
