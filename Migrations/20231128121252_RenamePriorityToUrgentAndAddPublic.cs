using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Viscon_ProjectC_Groep4.Migrations
{
    /// <inheritdoc />
    public partial class RenamePriorityToUrgentAndAddPublic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                schema: "public",
                table: "Tickets");

            migrationBuilder.AddColumn<bool>(
                name: "Public",
                schema: "public",
                table: "Tickets",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Urgent",
                schema: "public",
                table: "Tickets",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Public",
                schema: "public",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Urgent",
                schema: "public",
                table: "Tickets");

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                schema: "public",
                table: "Tickets",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
