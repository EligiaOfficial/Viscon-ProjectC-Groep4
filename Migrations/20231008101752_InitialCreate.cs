using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Viscon_ProjectC_Groep4.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Departments",
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
                name: "Messages",
                columns: table => new
                {
                    Msg_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Msg_Message = table.Column<string>(type: "text", nullable: false),
                    Message_Sender = table.Column<int>(type: "integer", nullable: false),
                    Msg_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Msg_Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Usr_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Usr_FirstName = table.Column<string>(type: "text", nullable: false),
                    Usr_LastName = table.Column<string>(type: "text", nullable: false),
                    Usr_Password = table.Column<string>(type: "text", nullable: false),
                    Usr_Email = table.Column<string>(type: "text", nullable: false),
                    Usr_Level = table.Column<int>(type: "integer", nullable: false),
                    Usr_Username = table.Column<string>(type: "text", nullable: false),
                    Usr_Role = table.Column<string>(type: "text", nullable: false),
                    Usr_PhoneNumber = table.Column<int>(type: "integer", nullable: false),
                    Usr_LanguagePreference = table.Column<string>(type: "text", nullable: false),
                    Usr_DepId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Usr_Id);
                    table.ForeignKey(
                        name: "FK_Users_Departments_Usr_DepId",
                        column: x => x.Usr_DepId,
                        principalTable: "Departments",
                        principalColumn: "Dep_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Tick_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Tick_MachId = table.Column<int>(type: "integer", nullable: false),
                    Tick_Title = table.Column<string>(type: "text", nullable: false),
                    Tick_Description = table.Column<string>(type: "text", nullable: false),
                    Tick_DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Tick_Priority = table.Column<int>(type: "integer", nullable: false),
                    Tick_DepartmentId = table.Column<int>(type: "integer", nullable: false),
                    Tick_MessageId = table.Column<int>(type: "integer", nullable: false),
                    Tick_Creator_UserId = table.Column<int>(type: "integer", nullable: false),
                    Tick_Helper_UserId = table.Column<int>(type: "integer", nullable: false),
                    Tick_Media = table.Column<string>(type: "text", nullable: false),
                    Tick_Resolved = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Tick_Id);
                    table.ForeignKey(
                        name: "FK_Tickets_Departments_Tick_DepartmentId",
                        column: x => x.Tick_DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Dep_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Machines_Tick_MachId",
                        column: x => x.Tick_MachId,
                        principalTable: "Machines",
                        principalColumn: "Mach_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Messages_Tick_MessageId",
                        column: x => x.Tick_MessageId,
                        principalTable: "Messages",
                        principalColumn: "Msg_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Users_Tick_Creator_UserId",
                        column: x => x.Tick_Creator_UserId,
                        principalTable: "Users",
                        principalColumn: "Usr_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Users_Tick_Helper_UserId",
                        column: x => x.Tick_Helper_UserId,
                        principalTable: "Users",
                        principalColumn: "Usr_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_Tick_Creator_UserId",
                table: "Tickets",
                column: "Tick_Creator_UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_Tick_DepartmentId",
                table: "Tickets",
                column: "Tick_DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_Tick_Helper_UserId",
                table: "Tickets",
                column: "Tick_Helper_UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_Tick_MachId",
                table: "Tickets",
                column: "Tick_MachId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_Tick_MessageId",
                table: "Tickets",
                column: "Tick_MessageId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Usr_DepId",
                table: "Users",
                column: "Usr_DepId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Machines");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Departments");
        }
    }
}
