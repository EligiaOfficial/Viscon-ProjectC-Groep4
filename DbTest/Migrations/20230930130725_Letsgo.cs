using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DbTest.Migrations
{
    /// <inheritdoc />
    public partial class Letsgo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Auto",
                table: "Auto");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Auto");

            migrationBuilder.RenameColumn(
                name: "Merk",
                table: "Auto",
                newName: "Auto_Merk");

            migrationBuilder.RenameColumn(
                name: "Bouwjaar",
                table: "Auto",
                newName: "Auto_Id");

            migrationBuilder.AlterColumn<int>(
                name: "Auto_Id",
                table: "Auto",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<string>(
                name: "Auto_Bouwjaar",
                table: "Auto",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Auto",
                table: "Auto",
                column: "Auto_Id");

            migrationBuilder.CreateTable(
                name: "Fiets",
                columns: table => new
                {
                    Fiets_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Fiets_Merk = table.Column<string>(type: "text", nullable: false),
                    Fiets_Bouwjaar = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fiets", x => x.Fiets_Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Fiets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Auto",
                table: "Auto");

            migrationBuilder.DropColumn(
                name: "Auto_Bouwjaar",
                table: "Auto");

            migrationBuilder.RenameColumn(
                name: "Auto_Merk",
                table: "Auto",
                newName: "Merk");

            migrationBuilder.RenameColumn(
                name: "Auto_Id",
                table: "Auto",
                newName: "Bouwjaar");

            migrationBuilder.AlterColumn<int>(
                name: "Bouwjaar",
                table: "Auto",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Auto",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Auto",
                table: "Auto",
                column: "Id");
        }
    }
}
