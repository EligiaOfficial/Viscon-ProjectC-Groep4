using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using Npgsql.EntityFrameworkCore.PostgreSQL;

using Entities;

namespace Viscon_ProjectC_Groep4
{
    public class ApplicationDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=Project_C;Username=postgres;Password=tymo2003");
        }

        public DbSet<Users> Users { get; set; } = null!;
        public DbSet<Machines> Machines { get; set; } = null!;
        public DbSet<Tickets> Tickets { get; set; } = null!;
        public DbSet<Messages> Messages { get; set; } = null!;
        public DbSet<Departments?> Departments { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");
        }

        public void SeedDb()
        {
            if (!this.Departments.Any())
            {
                this.Add(new Departments { Dep_Id = 1, Dep_Speciality = "Dummy" });
            }

            if (!this.Machines.Any())
            {
                this.Add(new Machines { Mach_Id = 1, Mach_Name = "Dummy", Mach_Type = "Dummy " });
            }

            this.SaveChanges();

            if (!this.Users.Any()) {
                const string password = "Dummy";

                CreatePassHash(password, out byte[] passwordHash, out byte[] passwordSalt);

                this.Add(new Users {
                    Usr_FirstName = "Dummy", 
                    Usr_LastName = "Dummy", 
                    Usr_Email = "dummy@dummy.com",
                    Usr_Level = 0,
                    Usr_Role = "Admin",
                    Usr_Username = "Dummy",
                    Usr_DepId = Departments.FirstOrDefault()!.Dep_Id,
                    Usr_LanguagePreference = "NL",
                    Usr_PhoneNumber = 06123456,
                    Usr_Password = passwordHash,
                    Usr_PasswSalt = passwordSalt,
                });
            }
            this.SaveChanges();
        }
        
        private static void CreatePassHash(string password, out byte[] passwordHash, out byte[] passwordSalt) {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }
}
