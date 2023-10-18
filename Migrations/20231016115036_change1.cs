using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Viscon_ProjectC_Groep4.Migrations
{
    /// <inheritdoc />
    public partial class change1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Tick_ExpectedToBeDone",
                schema: "public",
                table: "Tickets",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Tick_MadeAnyChanges",
                schema: "public",
                table: "Tickets",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tick_ExpectedToBeDone",
                schema: "public",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Tick_MadeAnyChanges",
                schema: "public",
                table: "Tickets");
        }
    }
}
