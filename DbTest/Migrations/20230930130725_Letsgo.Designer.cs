﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DbTest.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230930130725_Letsgo")]
    partial class Letsgo
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Auto", b =>
                {
                    b.Property<int>("Auto_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Auto_Id"));

                    b.Property<string>("Auto_Bouwjaar")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Auto_Merk")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Auto_Id");

                    b.ToTable("Auto");
                });

            modelBuilder.Entity("Fiets", b =>
                {
                    b.Property<int>("Fiets_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Fiets_Id"));

                    b.Property<string>("Fiets_Bouwjaar")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Fiets_Merk")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Fiets_Id");

                    b.ToTable("Fiets");
                });
#pragma warning restore 612, 618
        }
    }
}
