using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Viscon_ProjectC_Groep4.Migrations
{
    /// <inheritdoc />
    public partial class FixEntityFieldNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Tickets_TicketsTick_Id",
                schema: "public",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Departments_Tick_DepartmentId",
                schema: "public",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Machines_Tick_MachId",
                schema: "public",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Users_Tick_Creator_UserId",
                schema: "public",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Users_Tick_Helper_UserId",
                schema: "public",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Companies_Usr_CompId",
                schema: "public",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Departments_Usr_DepId",
                schema: "public",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Messages",
                schema: "public",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Msg_Id",
                schema: "public",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "Usr_Role",
                schema: "public",
                table: "Users",
                newName: "Role");

            migrationBuilder.RenameColumn(
                name: "Usr_PhoneNumber",
                schema: "public",
                table: "Users",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "Usr_Password",
                schema: "public",
                table: "Users",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "Usr_PasswSalt",
                schema: "public",
                table: "Users",
                newName: "PasswSalt");

            migrationBuilder.RenameColumn(
                name: "Usr_LastName",
                schema: "public",
                table: "Users",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Usr_LanguagePreference",
                schema: "public",
                table: "Users",
                newName: "LanguagePreference");

            migrationBuilder.RenameColumn(
                name: "Usr_FirstName",
                schema: "public",
                table: "Users",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "Usr_Email",
                schema: "public",
                table: "Users",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "Usr_DepId",
                schema: "public",
                table: "Users",
                newName: "DepartmentId");

            migrationBuilder.RenameColumn(
                name: "Usr_CompId",
                schema: "public",
                table: "Users",
                newName: "CompanyId");

            migrationBuilder.RenameColumn(
                name: "Usr_Id",
                schema: "public",
                table: "Users",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Users_Usr_DepId",
                schema: "public",
                table: "Users",
                newName: "IX_Users_DepartmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_Usr_CompId",
                schema: "public",
                table: "Users",
                newName: "IX_Users_CompanyId");

            migrationBuilder.RenameColumn(
                name: "Tick_Title",
                schema: "public",
                table: "Tickets",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Tick_Resolved",
                schema: "public",
                table: "Tickets",
                newName: "Resolved");

            migrationBuilder.RenameColumn(
                name: "Tick_Priority",
                schema: "public",
                table: "Tickets",
                newName: "Priority");

            migrationBuilder.RenameColumn(
                name: "Tick_Media",
                schema: "public",
                table: "Tickets",
                newName: "Media");

            migrationBuilder.RenameColumn(
                name: "Tick_MadeAnyChanges",
                schema: "public",
                table: "Tickets",
                newName: "MadeAnyChanges");

            migrationBuilder.RenameColumn(
                name: "Tick_MachId",
                schema: "public",
                table: "Tickets",
                newName: "MachineId");

            migrationBuilder.RenameColumn(
                name: "Tick_Helper_UserId",
                schema: "public",
                table: "Tickets",
                newName: "HelperUserId");

            migrationBuilder.RenameColumn(
                name: "Tick_ExpectedToBeDone",
                schema: "public",
                table: "Tickets",
                newName: "ExpectedToBeDone");

            migrationBuilder.RenameColumn(
                name: "Tick_Description",
                schema: "public",
                table: "Tickets",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Tick_DepartmentId",
                schema: "public",
                table: "Tickets",
                newName: "DepartmentId");

            migrationBuilder.RenameColumn(
                name: "Tick_DateCreated",
                schema: "public",
                table: "Tickets",
                newName: "DateCreated");

            migrationBuilder.RenameColumn(
                name: "Tick_Creator_UserId",
                schema: "public",
                table: "Tickets",
                newName: "CreatorUserId");

            migrationBuilder.RenameColumn(
                name: "Tick_Id",
                schema: "public",
                table: "Tickets",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_Tick_MachId",
                schema: "public",
                table: "Tickets",
                newName: "IX_Tickets_MachineId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_Tick_Helper_UserId",
                schema: "public",
                table: "Tickets",
                newName: "IX_Tickets_HelperUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_Tick_DepartmentId",
                schema: "public",
                table: "Tickets",
                newName: "IX_Tickets_DepartmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_Tick_Creator_UserId",
                schema: "public",
                table: "Tickets",
                newName: "IX_Tickets_CreatorUserId");

            migrationBuilder.RenameColumn(
                name: "TicketsTick_Id",
                schema: "public",
                table: "Messages",
                newName: "TicketId");

            migrationBuilder.RenameColumn(
                name: "Msg_TickId",
                schema: "public",
                table: "Messages",
                newName: "Sender");

            migrationBuilder.RenameColumn(
                name: "Msg_Message",
                schema: "public",
                table: "Messages",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "Msg_Date",
                schema: "public",
                table: "Messages",
                newName: "TimeSent");

            migrationBuilder.RenameColumn(
                name: "Message_Sender",
                schema: "public",
                table: "Messages",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_TicketsTick_Id",
                schema: "public",
                table: "Messages",
                newName: "IX_Messages_TicketId");

            migrationBuilder.RenameColumn(
                name: "Mach_Type",
                schema: "public",
                table: "Machines",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "Mach_Name",
                schema: "public",
                table: "Machines",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Mach_Id",
                schema: "public",
                table: "Machines",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "Dep_Speciality",
                schema: "public",
                table: "Departments",
                newName: "Speciality");

            migrationBuilder.RenameColumn(
                name: "Dep_Id",
                schema: "public",
                table: "Departments",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "Com_Name",
                schema: "public",
                table: "Companies",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Com_Id",
                schema: "public",
                table: "Companies",
                newName: "Id");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                schema: "public",
                table: "Messages",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Messages",
                schema: "public",
                table: "Messages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Tickets_TicketId",
                schema: "public",
                table: "Messages",
                column: "TicketId",
                principalSchema: "public",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Departments_DepartmentId",
                schema: "public",
                table: "Tickets",
                column: "DepartmentId",
                principalSchema: "public",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Machines_MachineId",
                schema: "public",
                table: "Tickets",
                column: "MachineId",
                principalSchema: "public",
                principalTable: "Machines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Users_CreatorUserId",
                schema: "public",
                table: "Tickets",
                column: "CreatorUserId",
                principalSchema: "public",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Users_HelperUserId",
                schema: "public",
                table: "Tickets",
                column: "HelperUserId",
                principalSchema: "public",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Companies_CompanyId",
                schema: "public",
                table: "Users",
                column: "CompanyId",
                principalSchema: "public",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Departments_DepartmentId",
                schema: "public",
                table: "Users",
                column: "DepartmentId",
                principalSchema: "public",
                principalTable: "Departments",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Tickets_TicketId",
                schema: "public",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Departments_DepartmentId",
                schema: "public",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Machines_MachineId",
                schema: "public",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Users_CreatorUserId",
                schema: "public",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Users_HelperUserId",
                schema: "public",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Companies_CompanyId",
                schema: "public",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Departments_DepartmentId",
                schema: "public",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Messages",
                schema: "public",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "Role",
                schema: "public",
                table: "Users",
                newName: "Usr_Role");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                schema: "public",
                table: "Users",
                newName: "Usr_PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "Password",
                schema: "public",
                table: "Users",
                newName: "Usr_Password");

            migrationBuilder.RenameColumn(
                name: "PasswSalt",
                schema: "public",
                table: "Users",
                newName: "Usr_PasswSalt");

            migrationBuilder.RenameColumn(
                name: "LastName",
                schema: "public",
                table: "Users",
                newName: "Usr_LastName");

            migrationBuilder.RenameColumn(
                name: "LanguagePreference",
                schema: "public",
                table: "Users",
                newName: "Usr_LanguagePreference");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                schema: "public",
                table: "Users",
                newName: "Usr_FirstName");

            migrationBuilder.RenameColumn(
                name: "Email",
                schema: "public",
                table: "Users",
                newName: "Usr_Email");

            migrationBuilder.RenameColumn(
                name: "DepartmentId",
                schema: "public",
                table: "Users",
                newName: "Usr_DepId");

            migrationBuilder.RenameColumn(
                name: "CompanyId",
                schema: "public",
                table: "Users",
                newName: "Usr_CompId");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "public",
                table: "Users",
                newName: "Usr_Id");

            migrationBuilder.RenameIndex(
                name: "IX_Users_DepartmentId",
                schema: "public",
                table: "Users",
                newName: "IX_Users_Usr_DepId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_CompanyId",
                schema: "public",
                table: "Users",
                newName: "IX_Users_Usr_CompId");

            migrationBuilder.RenameColumn(
                name: "Title",
                schema: "public",
                table: "Tickets",
                newName: "Tick_Title");

            migrationBuilder.RenameColumn(
                name: "Resolved",
                schema: "public",
                table: "Tickets",
                newName: "Tick_Resolved");

            migrationBuilder.RenameColumn(
                name: "Priority",
                schema: "public",
                table: "Tickets",
                newName: "Tick_Priority");

            migrationBuilder.RenameColumn(
                name: "Media",
                schema: "public",
                table: "Tickets",
                newName: "Tick_Media");

            migrationBuilder.RenameColumn(
                name: "MadeAnyChanges",
                schema: "public",
                table: "Tickets",
                newName: "Tick_MadeAnyChanges");

            migrationBuilder.RenameColumn(
                name: "MachineId",
                schema: "public",
                table: "Tickets",
                newName: "Tick_MachId");

            migrationBuilder.RenameColumn(
                name: "HelperUserId",
                schema: "public",
                table: "Tickets",
                newName: "Tick_Helper_UserId");

            migrationBuilder.RenameColumn(
                name: "ExpectedToBeDone",
                schema: "public",
                table: "Tickets",
                newName: "Tick_ExpectedToBeDone");

            migrationBuilder.RenameColumn(
                name: "Description",
                schema: "public",
                table: "Tickets",
                newName: "Tick_Description");

            migrationBuilder.RenameColumn(
                name: "DepartmentId",
                schema: "public",
                table: "Tickets",
                newName: "Tick_DepartmentId");

            migrationBuilder.RenameColumn(
                name: "DateCreated",
                schema: "public",
                table: "Tickets",
                newName: "Tick_DateCreated");

            migrationBuilder.RenameColumn(
                name: "CreatorUserId",
                schema: "public",
                table: "Tickets",
                newName: "Tick_Creator_UserId");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "public",
                table: "Tickets",
                newName: "Tick_Id");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_MachineId",
                schema: "public",
                table: "Tickets",
                newName: "IX_Tickets_Tick_MachId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_HelperUserId",
                schema: "public",
                table: "Tickets",
                newName: "IX_Tickets_Tick_Helper_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_DepartmentId",
                schema: "public",
                table: "Tickets",
                newName: "IX_Tickets_Tick_DepartmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_CreatorUserId",
                schema: "public",
                table: "Tickets",
                newName: "IX_Tickets_Tick_Creator_UserId");

            migrationBuilder.RenameColumn(
                name: "TimeSent",
                schema: "public",
                table: "Messages",
                newName: "Msg_Date");

            migrationBuilder.RenameColumn(
                name: "TicketId",
                schema: "public",
                table: "Messages",
                newName: "TicketsTick_Id");

            migrationBuilder.RenameColumn(
                name: "Sender",
                schema: "public",
                table: "Messages",
                newName: "Msg_TickId");

            migrationBuilder.RenameColumn(
                name: "Content",
                schema: "public",
                table: "Messages",
                newName: "Msg_Message");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "public",
                table: "Messages",
                newName: "Message_Sender");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_TicketId",
                schema: "public",
                table: "Messages",
                newName: "IX_Messages_TicketsTick_Id");

            migrationBuilder.RenameColumn(
                name: "Type",
                schema: "public",
                table: "Machines",
                newName: "Mach_Type");

            migrationBuilder.RenameColumn(
                name: "Name",
                schema: "public",
                table: "Machines",
                newName: "Mach_Name");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "public",
                table: "Machines",
                newName: "Mach_Id");

            migrationBuilder.RenameColumn(
                name: "Speciality",
                schema: "public",
                table: "Departments",
                newName: "Dep_Speciality");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "public",
                table: "Departments",
                newName: "Dep_Id");

            migrationBuilder.RenameColumn(
                name: "Name",
                schema: "public",
                table: "Companies",
                newName: "Com_Name");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "public",
                table: "Companies",
                newName: "Com_Id");

            migrationBuilder.AlterColumn<int>(
                name: "Message_Sender",
                schema: "public",
                table: "Messages",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "Msg_Id",
                schema: "public",
                table: "Messages",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Messages",
                schema: "public",
                table: "Messages",
                column: "Msg_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Tickets_TicketsTick_Id",
                schema: "public",
                table: "Messages",
                column: "TicketsTick_Id",
                principalSchema: "public",
                principalTable: "Tickets",
                principalColumn: "Tick_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Departments_Tick_DepartmentId",
                schema: "public",
                table: "Tickets",
                column: "Tick_DepartmentId",
                principalSchema: "public",
                principalTable: "Departments",
                principalColumn: "Dep_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Machines_Tick_MachId",
                schema: "public",
                table: "Tickets",
                column: "Tick_MachId",
                principalSchema: "public",
                principalTable: "Machines",
                principalColumn: "Mach_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Users_Tick_Creator_UserId",
                schema: "public",
                table: "Tickets",
                column: "Tick_Creator_UserId",
                principalSchema: "public",
                principalTable: "Users",
                principalColumn: "Usr_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Users_Tick_Helper_UserId",
                schema: "public",
                table: "Tickets",
                column: "Tick_Helper_UserId",
                principalSchema: "public",
                principalTable: "Users",
                principalColumn: "Usr_Id");

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
    }
}
