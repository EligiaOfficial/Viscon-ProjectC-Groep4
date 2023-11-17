/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
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
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=Project_C;Username=postgres;Password=");
        //}


        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Machine> Machines { get; set; } = null!;
        public DbSet<Ticket> Tickets { get; set; } = null!;
        public DbSet<Message> Messages { get; set; } = null!;
        public DbSet<Department> Departments { get; set; } = null!;
        public DbSet<Company> Companies { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.HasDefaultSchema("public");
        }

        public void SeedDb() {
            if (!this.Departments.Any()) {
                this.Add(new Department {Id = 1, Speciality = "Viscon Plant Technology"});
                this.Add(new Department {Id = 2, Speciality = "Viscon Fresh Produce"});
                this.Add(new Department {Id = 3, Speciality = "Viscon Logistics"});
                this.Add(new Department {Id = 4, Speciality = "Viscon Hatchery Automation"});
            }

            if (!this.Machines.Any()) {
                this.Add(new Machine {Id = 1, Name = "T-800", Type = "Schwarzenegger"});
                this.Add(new Machine {Id = 2, Name = "Rev-9", Type = "Liquid Nano-particles"});
                this.Add(new Machine {Id = 3, Name = "Model X", Type = "Car"});
            }

            if (!this.Companies.Any()) {
                this.Add(new Company {Id = 1, Name = "Viscon Group"});
                this.Add(new Company {Id = 2, Name = "Viscon Poland"});
                this.Add(new Company {Id = 3, Name = "Neste"});
                this.Add(new Company {Id = 4, Name = "Green Farmers"});
                this.Add(new Company {Id = 5, Name = "Vinovo"});
            }

            this.SaveChanges();

            if (!this.Users.Any()) {
                const string password = "Viscon";
                CreatePassHash(password, out byte[] passwordHash, out byte[] passwordSalt);
                this.Add(new User {
                    FirstName = "Admin",
                    LastName = "Account",
                    Email = "admin@viscon.com",
                    Role = RoleTypes.ADMIN,
                    CompanyId = Companies.FirstOrDefault()!.Id,
                    DepartmentId = Departments.FirstOrDefault()!.Id,
                    LanguagePreference = "NL",
                    PhoneNumber = 0612345678,
                    Password = passwordHash,
                    PasswSalt = passwordSalt,
                }); // Admin Login: admin@viscon.com Viscon
                this.Add(new User {
                    FirstName = "VisconEmployee",
                    LastName = "Account",
                    Email = "viscon@viscon.com",
                    Role = RoleTypes.VISCON,
                    CompanyId = Companies.FirstOrDefault()!.Id,
                    DepartmentId = Departments.FirstOrDefault()!.Id,
                    LanguagePreference = "NL",
                    PhoneNumber = 0612345678,
                    Password = passwordHash,
                    PasswSalt = passwordSalt,
                }); // Viscon Employee Login: viscon@viscon.com Viscon
                this.Add(new User {
                    FirstName = "KeyUser",
                    LastName = "Account",
                    Email = "key@viscon.com",
                    Role = RoleTypes.KEYUSER,
                    CompanyId = Companies.FirstOrDefault()!.Id,
                    DepartmentId = Departments.FirstOrDefault()!.Id,
                    LanguagePreference = "NL",
                    PhoneNumber = 0612345678,
                    Password = passwordHash,
                    PasswSalt = passwordSalt,
                }); // KeyUser Login: key@viscon.com Viscon
                this.Add(new User {
                    FirstName = "User",
                    LastName = "Account",
                    Email = "user@viscon.com",
                    Role = RoleTypes.USER,
                    CompanyId = Companies.FirstOrDefault()!.Id,
                    DepartmentId = Departments.FirstOrDefault()!.Id,
                    LanguagePreference = "NL",
                    PhoneNumber = 0612345678,
                    Password = passwordHash,
                    PasswSalt = passwordSalt,
                }); // User Login: user@viscon.com Viscon
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
