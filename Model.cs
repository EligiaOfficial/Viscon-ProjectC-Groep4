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


        public DbSet<Users> Users { get; set; } = null!;
        public DbSet<Machines> Machines { get; set; } = null!;
        public DbSet<Tickets> Tickets { get; set; } = null!;
        public DbSet<Messages> Messages { get; set; } = null!;
        public DbSet<Departments> Departments { get; set; } = null!;
        public DbSet<Companies> Companies { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.HasDefaultSchema("public");
        }

        public void SeedDb() {
            if (!this.Departments.Any()) {
                this.Add(new Departments {Dep_Id = 1, Dep_Speciality = "Viscon Plant Technology"});
                this.Add(new Departments {Dep_Id = 2, Dep_Speciality = "Viscon Fresh Produce"});
                this.Add(new Departments {Dep_Id = 3, Dep_Speciality = "Viscon Logistics"});
                this.Add(new Departments {Dep_Id = 4, Dep_Speciality = "Viscon Hatchery Automation"});
            }

            if (!this.Machines.Any()) {
                this.Add(new Machines {Mach_Id = 1, Mach_Name = "T-800", Mach_Type = "Schwarzenegger"});
                this.Add(new Machines {Mach_Id = 2, Mach_Name = "Rev-9", Mach_Type = "Liquid Nano-particles"});
                this.Add(new Machines {Mach_Id = 3, Mach_Name = "Model X", Mach_Type = "Car"});
            }
            
            if (!this.Companies.Any()) {
                this.Add(new Companies {Com_Id = 1, Com_Name = "Viscon Group"});
                this.Add(new Companies {Com_Id = 2, Com_Name = "Viscon Poland"});
                this.Add(new Companies {Com_Id = 3, Com_Name = "Neste"});
                this.Add(new Companies {Com_Id = 4, Com_Name = "Green Farmers"});
                this.Add(new Companies {Com_Id = 5, Com_Name = "Vinovo"});
            }

            this.SaveChanges();

            if (!this.Users.Any()) {
                const string password = "Viscon";
                CreatePassHash(password, out byte[] passwordHash, out byte[] passwordSalt);
                this.Add(new Users {
                    Usr_FirstName = "Admin",
                    Usr_LastName = "Account",
                    Usr_Email = "admin@viscon.com",
                    Usr_Role = 1, 
                    Usr_CompId = Companies.FirstOrDefault()!.Com_Id, 
                    Usr_DepId = Departments.FirstOrDefault()!.Dep_Id,
                    Usr_LanguagePreference = "NL",
                    Usr_PhoneNumber = 0612345678,
                    Usr_Password = passwordHash,
                    Usr_PasswSalt = passwordSalt,
                }); // Admin Login: admin@viscon.com Viscon
                this.Add(new Users {
                    Usr_FirstName = "VisconEmployee",
                    Usr_LastName = "Account",
                    Usr_Email = "viscon@viscon.com",
                    Usr_Role = 2, 
                    Usr_CompId = Companies.FirstOrDefault()!.Com_Id, 
                    Usr_DepId = Departments.FirstOrDefault()!.Dep_Id,
                    Usr_LanguagePreference = "NL",
                    Usr_PhoneNumber = 0612345678,
                    Usr_Password = passwordHash,
                    Usr_PasswSalt = passwordSalt,
                }); // Viscon Employee Login: viscon@viscon.com Viscon
                this.Add(new Users {
                    Usr_FirstName = "KeyUser",
                    Usr_LastName = "Account",
                    Usr_Email = "key@viscon.com",
                    Usr_Role = 3, 
                    Usr_CompId = Companies.FirstOrDefault()!.Com_Id, 
                    Usr_DepId = Departments.FirstOrDefault()!.Dep_Id,
                    Usr_LanguagePreference = "NL",
                    Usr_PhoneNumber = 0612345678,
                    Usr_Password = passwordHash,
                    Usr_PasswSalt = passwordSalt,
                }); // KeyUser Login: key@viscon.com Viscon
                this.Add(new Users {
                    Usr_FirstName = "User",
                    Usr_LastName = "Account",
                    Usr_Email = "user@viscon.com",
                    Usr_Role = 4, 
                    Usr_CompId = Companies.FirstOrDefault()!.Com_Id, 
                    Usr_DepId = Departments.FirstOrDefault()!.Dep_Id,
                    Usr_LanguagePreference = "NL",
                    Usr_PhoneNumber = 0612345678,
                    Usr_Password = passwordHash,
                    Usr_PasswSalt = passwordSalt,
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