using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Viscon_ProjectC_Groep4.Migrations
{
    /// <inheritdoc />
    public partial class MessageTicketsTickId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Tickets_TicketsTick_Id",
                schema: "public",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_TicketsTick_Id",
                schema: "public",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "TicketsTick_Id",
                schema: "public",
                table: "Messages");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_Msg_TickId",
                schema: "public",
                table: "Messages",
                column: "Msg_TickId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Tickets_Msg_TickId",
                schema: "public",
                table: "Messages",
                column: "Msg_TickId",
                principalSchema: "public",
                principalTable: "Tickets",
                principalColumn: "Tick_Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Tickets_Msg_TickId",
                schema: "public",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_Msg_TickId",
                schema: "public",
                table: "Messages");

            migrationBuilder.AddColumn<int>(
                name: "TicketsTick_Id",
                schema: "public",
                table: "Messages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_TicketsTick_Id",
                schema: "public",
                table: "Messages",
                column: "TicketsTick_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Tickets_TicketsTick_Id",
                schema: "public",
                table: "Messages",
                column: "TicketsTick_Id",
                principalSchema: "public",
                principalTable: "Tickets",
                principalColumn: "Tick_Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
