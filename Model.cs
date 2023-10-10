using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Npgsql.EntityFrameworkCore.PostgreSQL;

using Entities;

namespace Viscon_ProjectC_Groep4
{
    public class ApplicationDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=192.168.56.1;Port=5432;Database=Project_C;Username=postgres;Password=");
        }

        public DbSet<Users> Users { get; set; } = null!;
        public DbSet<Machines> Machines { get; set; } = null!;
        public DbSet<Tickets> Tickets { get; set; } = null!;
        public DbSet<Messages> Messages { get; set; } = null!;
        public DbSet<Departments> Departments { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");
        }

        public void seedDb()
        {
            if (this.Departments.Count() == 0)
            {
                this.Add(new Departments { Dep_Id = 1, Dep_Speciality = "Dummy" });
            }

            if (this.Machines.Count() == 0)
            {
                this.Add(new Machines { Mach_Id = 1, Mach_Name = "Dummy", Mach_Type = "Dummy " });
            }
            this.SaveChanges();
        }
    }
}
