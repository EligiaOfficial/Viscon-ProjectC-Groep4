using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Entities;
using Viscon_ProjectC_Groep4;
using DTOs;

namespace Services;
using Microsoft.EntityFrameworkCore;

public class EFTicketStorage : ITicketStorage {
    private ApplicationDbContext _context;

    public EFTicketStorage(ApplicationDbContext context) {
        _context = context;
    }

    public async Task AddTicket(Ticket ticket) {
        await _context.Tickets.AddAsync(ticket);
        await _context.SaveChangesAsync();
    }

    public async Task<TicketDataDTO?> GetTicketViewData(int id) =>
        await _context.Tickets
            .Include(t => t.Machine)
            .Include(t => t.Department)
            .Include(t => t.Creator)
            .ThenInclude(c => c.Company)
            .Include(t => t.Helper)
            .ThenInclude(h => h.Company)
            .Where(t => t.Id == id)
            .Select(t => new TicketDataDTO {
                Title = t.Title,
                Description = t.Description,
                MadeAnyChanges = t.MadeAnyChanges,
                ExpectedToBeDone = t.ExpectedToBeDone,
                Urgent = t.Urgent,
                Resolved = t.Resolved,
                DateCreated = t.DateCreated,
                CompanyName = t.Creator.Company.Name,
                CreatorName = $"{t.Creator.FirstName} {t.Creator.LastName}",
                MachineName = t.Machine.Name,
                DepartmentName = t.Department.Speciality,
                HelperName = $"{t.Helper.FirstName} {t.Helper.LastName}",
                Published = t.Public,
                CreatorCompanyId = t.Creator.Company.Id
            })
            .FirstOrDefaultAsync();

    public async Task<bool> UpdateTicket(TicketUpdateDTO data) {
        Ticket? ticket = await _context.Tickets.FirstOrDefaultAsync(
            t => t.Id == data.TicketId
        );
        if (ticket is null) return false;
        ticket.Urgent = data.Urgent;
        ticket.Public = data.Published;
        ticket.Resolved = data.Resolved;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ClaimTicket(int ticketId, int userId) {
        Ticket? ticket = await _context.Tickets.FirstOrDefaultAsync(
            t => t.Id == ticketId
        );
        if (ticket is null) return false;
        ticket.HelperUserId = userId;
        await _context.SaveChangesAsync();
        return true;
    }

    private IAsyncEnumerable<object> _selectTicketData(
        Expression<Func<Ticket, bool>> expression
    ) {
        return _context.Tickets
            .Include(t => t.Machine)
            .Include(t => t.Department)
            .Include(t => t.Creator)
            .Include(t => t.Helper)
            .Where(expression)
            .Select(
                t => new {
                    TicketID = t.Id,
                    Title = t.Title,
                    Resolved = t.Resolved,
                    Urgent = t.Urgent,
                    Company = t.Creator.Company.Id,
                    Machine = t.Machine.Name,
                    Department = t.Department.Speciality,
                    DepartmentId = t.Department.Id,
                    Supporter = ($"t.Supporter.LastName t.Supporter.FirstName"),
                    Created = t.DateCreated,
                    Creator = $"{t.Creator.LastName} {t.Creator.FirstName}"
                }
            )
            .AsAsyncEnumerable();
    }

    public IAsyncEnumerable<object> SelectTicketDataByCompanyId(
        int companyId
    ) =>
        _selectTicketData(t => t.Creator.CompanyId == companyId);

    public IAsyncEnumerable<object> SelectTicketDataByDepartmentId(
        int departmentId
    ) =>
        _selectTicketData(t => t.Department.Id == departmentId);

    public IAsyncEnumerable<object> SelectTicketData() =>
        _selectTicketData(t => true);

    public IAsyncEnumerable<object> SelectArchivedTicketData(int userId) =>
        _selectTicketData(t => t.Resolved && t.Public && t.CreatorUserId == userId);

    public async Task<int?> GetTicketCompanyId(int ticketId) =>
        await _context.Tickets
            .Include(t => t.Creator)
            .ThenInclude(c => c.Company)
            .Where(t => t.Id == ticketId)
            .Select(t => t.Creator.Company.Id)
            .FirstOrDefaultAsync();
}
