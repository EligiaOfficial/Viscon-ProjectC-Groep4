using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Viscon_ProjectC_Groep4;
using Viscon_ProjectC_Groep4.Services;
using Viscon_ProjectC_Groep4.Services.AuthService;
using Viscon_ProjectC_Groep4.Services.CompanyService;
using Viscon_ProjectC_Groep4.Services.DepartmentService;
using Viscon_ProjectC_Groep4.Services.MachineService;
using Viscon_ProjectC_Groep4.Services.TicketService;
using Viscon_ProjectC_Groep4.Services.UserService;
using Services;

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
    .AddScoped<ITicketStorage, EFTicketStorage>()
    .AddScoped<IMessageStorage, EFMessageStorage>()
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
builder.Services.AddScoped<AuthServices>();
builder.Services.AddScoped<CompanyServices>();
builder.Services.AddScoped<DepartmentServices>();
builder.Services.AddScoped<MachineServices>();
builder.Services.AddScoped<TicketServices>();
builder.Services.AddScoped<UserServices>();

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
