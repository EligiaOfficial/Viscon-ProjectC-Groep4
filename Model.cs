
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Npgsql.EntityFrameworkCore.PostgreSQL;

public class ApplicationDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=192.168.178.241;Port=5432;Database=Project_C;Username=postgres;Password=");
    }

    public DbSet<Users> Users { get; set; }
    public DbSet<Machines> Machines {get; set;}
    public DbSet<Tickets> Tickets { get; set; }
    public DbSet<Messages> Messages {get; set;}
    public DbSet<Departments> Departments { get; set; }
    
    
}