using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Viscon_ProjectC_Groep4.Migrations
{
    /// <inheritdoc />
    public partial class VisualFileByteArray2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Tickets_TicketId",
                schema: "public",
                table: "Files");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Files",
                schema: "public",
                table: "Files");

            migrationBuilder.RenameTable(
                name: "Files",
                schema: "public",
                newName: "VisualFiles",
                newSchema: "public");

            migrationBuilder.RenameIndex(
                name: "IX_Files_TicketId",
                schema: "public",
                table: "VisualFiles",
                newName: "IX_VisualFiles_TicketId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VisualFiles",
                schema: "public",
                table: "VisualFiles",
                column: "Id");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VisualFiles_Tickets_TicketId",
                schema: "public",
                table: "VisualFiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VisualFiles",
                schema: "public",
                table: "VisualFiles");

            migrationBuilder.RenameTable(
                name: "VisualFiles",
                schema: "public",
                newName: "Files",
                newSchema: "public");

            migrationBuilder.RenameIndex(
                name: "IX_VisualFiles_TicketId",
                schema: "public",
                table: "Files",
                newName: "IX_Files_TicketId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Files",
                schema: "public",
                table: "Files",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Tickets_TicketId",
                schema: "public",
                table: "Files",
                column: "TicketId",
                principalSchema: "public",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
