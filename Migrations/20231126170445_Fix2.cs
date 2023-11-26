using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Viscon_ProjectC_Groep4.Migrations
{
    /// <inheritdoc />
    public partial class Fix2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VisualFiles_Tickets_TicketId",
                schema: "public",
                table: "VisualFiles");

            migrationBuilder.DropIndex(
                name: "IX_VisualFiles_TicketId",
                schema: "public",
                table: "VisualFiles");

            migrationBuilder.DropColumn(
                name: "TicketId",
                schema: "public",
                table: "VisualFiles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TicketId",
                schema: "public",
                table: "VisualFiles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_VisualFiles_TicketId",
                schema: "public",
                table: "VisualFiles",
                column: "TicketId");

            migrationBuilder.AddForeignKey(
                name: "FK_VisualFiles_Tickets_TicketId",
                schema: "public",
                table: "VisualFiles",
                column: "TicketId",
                principalSchema: "public",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
