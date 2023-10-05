using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;

using System.ComponentModel.DataAnnotations.Schema;

public class ApplicationDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=Project_C;Username=;Password=");
    }

    public DbSet<Users> Users { get; set; }
    public DbSet<Machines> Machines { get; set; }
    public DbSet<Tickets> Tickets { get; set; }
    public DbSet<Messages> Messages { get; set; }
    public DbSet<Departments> Departments { get; set; }


}