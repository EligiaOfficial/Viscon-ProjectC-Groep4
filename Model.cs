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
            optionsBuilder.UseNpgsql("Host=192.168.56.1;Port=5432;Database=Project_C;Username=postgres;Password=");
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

            if (this.Users.Count() == 0) {
                var password = "Dummy";

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
        
        private void CreatePassHash(string password, out byte[] passwordHash, out byte[] passwordSalt) {
            using (var hmac = new HMACSHA512()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
