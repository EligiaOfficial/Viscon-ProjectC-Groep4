﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Viscon_ProjectC_Groep4.Migrations
{
    /// <inheritdoc />
    public partial class MergeConflictsFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "public");

            migrationBuilder.CreateTable(
                name: "Companies",
                schema: "public",
                columns: table => new
                {
                    Com_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Com_Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Com_Id);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                schema: "public",
                columns: table => new
                {
                    Dep_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Dep_Speciality = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Dep_Id);
                });

            migrationBuilder.CreateTable(
                name: "Machines",
                schema: "public",
                columns: table => new
                {
                    Mach_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Mach_Name = table.Column<string>(type: "text", nullable: false),
                    Mach_Type = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Machines", x => x.Mach_Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "public",
                columns: table => new
                {
                    Usr_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Usr_FirstName = table.Column<string>(type: "text", nullable: false),
                    Usr_LastName = table.Column<string>(type: "text", nullable: false),
                    Usr_Password = table.Column<byte[]>(type: "bytea", nullable: false),
                    Usr_PasswSalt = table.Column<byte[]>(type: "bytea", nullable: false),
                    Usr_Email = table.Column<string>(type: "text", nullable: false),
                    Usr_Role = table.Column<int>(type: "integer", nullable: false),
                    Usr_PhoneNumber = table.Column<int>(type: "integer", nullable: false),
                    Usr_LanguagePreference = table.Column<string>(type: "text", nullable: false),
                    Usr_DepId = table.Column<int>(type: "integer", nullable: false),
                    Usr_CompId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Usr_Id);
                    table.ForeignKey(
                        name: "FK_Users_Companies_Usr_CompId",
                        column: x => x.Usr_CompId,
                        principalSchema: "public",
                        principalTable: "Companies",
                        principalColumn: "Com_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Users_Departments_Usr_DepId",
                        column: x => x.Usr_DepId,
                        principalSchema: "public",
                        principalTable: "Departments",
                        principalColumn: "Dep_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                schema: "public",
                columns: table => new
                {
                    Tick_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Tick_MachId = table.Column<int>(type: "integer", nullable: false),
                    Tick_Title = table.Column<string>(type: "text", nullable: false),
                    Tick_Description = table.Column<string>(type: "text", nullable: false),
                    Tick_DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Tick_Priority = table.Column<int>(type: "integer", nullable: false),
                    Tick_ExpectedToBeDone = table.Column<string>(type: "text", nullable: false),
                    Tick_MadeAnyChanges = table.Column<string>(type: "text", nullable: false),
                    Tick_DepartmentId = table.Column<int>(type: "integer", nullable: false),
                    Tick_Creator_UserId = table.Column<int>(type: "integer", nullable: false),
                    Tick_Helper_UserId = table.Column<int>(type: "integer", nullable: true),
                    Tick_Media = table.Column<string>(type: "text", nullable: true),
                    Tick_Resolved = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Tick_Id);
                    table.ForeignKey(
                        name: "FK_Tickets_Departments_Tick_DepartmentId",
                        column: x => x.Tick_DepartmentId,
                        principalSchema: "public",
                        principalTable: "Departments",
                        principalColumn: "Dep_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Machines_Tick_MachId",
                        column: x => x.Tick_MachId,
                        principalSchema: "public",
                        principalTable: "Machines",
                        principalColumn: "Mach_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Users_Tick_Creator_UserId",
                        column: x => x.Tick_Creator_UserId,
                        principalSchema: "public",
                        principalTable: "Users",
                        principalColumn: "Usr_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Users_Tick_Helper_UserId",
                        column: x => x.Tick_Helper_UserId,
                        principalSchema: "public",
                        principalTable: "Users",
                        principalColumn: "Usr_Id");
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                schema: "public",
                columns: table => new
                {
                    Msg_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Msg_Message = table.Column<string>(type: "text", nullable: false),
                    Message_Sender = table.Column<int>(type: "integer", nullable: false),
                    Msg_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Msg_TickId = table.Column<int>(type: "integer", nullable: false),
                    TicketsTick_Id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Msg_Id);
                    table.ForeignKey(
                        name: "FK_Messages_Tickets_TicketsTick_Id",
                        column: x => x.TicketsTick_Id,
                        principalSchema: "public",
                        principalTable: "Tickets",
                        principalColumn: "Tick_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_TicketsTick_Id",
                schema: "public",
                table: "Messages",
                column: "TicketsTick_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_Tick_Creator_UserId",
                schema: "public",
                table: "Tickets",
                column: "Tick_Creator_UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_Tick_DepartmentId",
                schema: "public",
                table: "Tickets",
                column: "Tick_DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_Tick_Helper_UserId",
                schema: "public",
                table: "Tickets",
                column: "Tick_Helper_UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_Tick_MachId",
                schema: "public",
                table: "Tickets",
                column: "Tick_MachId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Usr_CompId",
                schema: "public",
                table: "Users",
                column: "Usr_CompId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Usr_DepId",
                schema: "public",
                table: "Users",
                column: "Usr_DepId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Tickets",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Machines",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Companies",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Departments",
                schema: "public");
        }
    }
}
