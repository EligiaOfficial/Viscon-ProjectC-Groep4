using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Viscon_ProjectC_Groep4.Migrations
{
    /// <inheritdoc />
    public partial class RenameEntitiesFromPluralToSingular : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Companies_Usr_CompId",
                schema: "public",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Departments_Usr_DepId",
                schema: "public",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "Usr_DepId",
                schema: "public",
                table: "Users",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "Usr_CompId",
                schema: "public",
                table: "Users",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Companies_Usr_CompId",
                schema: "public",
                table: "Users",
                column: "Usr_CompId",
                principalSchema: "public",
                principalTable: "Companies",
                principalColumn: "Com_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Departments_Usr_DepId",
                schema: "public",
                table: "Users",
                column: "Usr_DepId",
                principalSchema: "public",
                principalTable: "Departments",
                principalColumn: "Dep_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Companies_Usr_CompId",
                schema: "public",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Departments_Usr_DepId",
                schema: "public",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "Usr_DepId",
                schema: "public",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Usr_CompId",
                schema: "public",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Companies_Usr_CompId",
                schema: "public",
                table: "Users",
                column: "Usr_CompId",
                principalSchema: "public",
                principalTable: "Companies",
                principalColumn: "Com_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Departments_Usr_DepId",
                schema: "public",
                table: "Users",
                column: "Usr_DepId",
                principalSchema: "public",
                principalTable: "Departments",
                principalColumn: "Dep_Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
