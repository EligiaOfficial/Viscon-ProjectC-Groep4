using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Viscon_ProjectC_Groep4;
using Entities;
using Viscon_ProjectC_Groep4.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.AddConsole();
// Add services to the container.
builder.Services
    .AddDbContext<ApplicationDbContext>(
        options => options.UseNpgsql(
            builder.Configuration["database:connection_string"]
        )
    )
    .AddSingleton<Authenticator>()
    .AddControllersWithViews(options => options.ValueProviderFactories.Add(
        new ModelBinding.ClaimValueProviderFactory()));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options => {
        options.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                "aSlOdjn0gJKhZBerB9oPDiCxQ7h5aRmYyNX94ytbxC7HJmq109VREMVAJW+dpKpSbZZryJPbHgX7jpy6bLvy0Iw="
            )),
            ValidateAudience = false,
            ValidateIssuer = false
        };
    });
builder.Services.AddAuthorization(options => {
    options.AddPolicy("user", p => p.RequireClaim(
        ClaimTypes.Role, "ADMIN", "VISCON", "KEYUSER", "USER"
    ));
    options.AddPolicy("key_user", p=> p.RequireClaim(
        ClaimTypes.Role, "ADMIN", "VISCON", "KEYUSER"
    ));
    options.AddPolicy("viscon", p => p.RequireClaim(
        ClaimTypes.Role, "ADMIN", "VISCON"
    ));
    options.AddPolicy("admin", p => p.RequireClaim(
        ClaimTypes.Role, "ADMIN"
    ));
});

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
app.UseAuthentication();
app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();
