using Microsoft.EntityFrameworkCore;
using Entities;
using Viscon_ProjectC_Groep4;

namespace Services;


public class EFMessageStorage : IMessageStorage {
    private readonly ApplicationDbContext _context;

    public EFMessageStorage(ApplicationDbContext context) {
        _context = context;
    }

    public async Task AddMessage(Message message) {
        await _context.Messages.AddAsync(message);
        await _context.SaveChangesAsync();
    }

    public IAsyncEnumerable<Message> GetPage(int id) {
        return _context.Messages
            .OrderBy(m => m.Id)
            .Where(m => m.Id > id)
            .Take(10)
            .AsAsyncEnumerable();
    }

    public IAsyncEnumerable<Message> GetMessagesByTicketId(int ticketId) {
        return _context.Messages
            .Where(m => m.TicketId == ticketId)
            .OrderBy(m => m.Id)
            .AsAsyncEnumerable();
    }
}
