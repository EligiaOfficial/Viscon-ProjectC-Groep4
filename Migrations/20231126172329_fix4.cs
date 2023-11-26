using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Viscon_ProjectC_Groep4.Migrations
{
    /// <inheritdoc />
    public partial class fix4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Media",
                schema: "public",
                table: "Tickets");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Media",
                schema: "public",
                table: "Tickets",
                type: "text",
                nullable: true);
        }
    }
}
