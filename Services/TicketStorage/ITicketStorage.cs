using System.Linq.Expressions;
using Entities;
using DTOs;

namespace Services;

public interface ITicketStorage {
    public Task AddTicket(Ticket ticket);

    public Task<TicketDataDTO?> GetTicketViewData(int id);

    //public IAsyncEnumerable<Ticket> SelectTickets(Expression<Func<Ticket, bool>> expression);

    public Task<bool> UpdateTicket(TicketUpdateDTO data);

    public IAsyncEnumerable<object> SelectTicketDataByCompanyId(int companyId);

    public IAsyncEnumerable<object> SelectTicketDataByDepartmentId(int companyId);

    public IAsyncEnumerable<object> SelectTicketData();

    public IAsyncEnumerable<object> SelectArchivedTicketData(int userId);

    public Task<int?> GetTicketCompanyId(int ticketId);

    public Task<bool> ClaimTicket(int ticketId, int userId);
}
