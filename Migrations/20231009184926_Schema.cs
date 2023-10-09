using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Viscon_ProjectC_Groep4.Migrations
{
    /// <inheritdoc />
    public partial class Schema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "public");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "Users",
                newSchema: "public");

            migrationBuilder.RenameTable(
                name: "Tickets",
                newName: "Tickets",
                newSchema: "public");

            migrationBuilder.RenameTable(
                name: "Messages",
                newName: "Messages",
                newSchema: "public");

            migrationBuilder.RenameTable(
                name: "Machines",
                newName: "Machines",
                newSchema: "public");

            migrationBuilder.RenameTable(
                name: "Departments",
                newName: "Departments",
                newSchema: "public");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "Users",
                schema: "public",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "Tickets",
                schema: "public",
                newName: "Tickets");

            migrationBuilder.RenameTable(
                name: "Messages",
                schema: "public",
                newName: "Messages");

            migrationBuilder.RenameTable(
                name: "Machines",
                schema: "public",
                newName: "Machines");

            migrationBuilder.RenameTable(
                name: "Departments",
                schema: "public",
                newName: "Departments");
        }
    }
}
