
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

    public DbSet<Users> Users { get; set; } = null!;
    public DbSet<Machines> Machines {get; set;} = null!;
    public DbSet<Tickets> Tickets { get; set; } = null!;
    public DbSet<Messages> Messages { get; set; } = null!;
    public DbSet<Departments> Departments { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("public"); 
    }

}