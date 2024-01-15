using Microsoft.EntityFrameworkCore;
using Entities;
using Viscon_ProjectC_Groep4;
using DTOs;

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

    public IAsyncEnumerable<MessageDataDTO> GetMessagesByTicketId(int ticketId) {
        return _context.Messages
            .Where(m => m.TicketId == ticketId)
            .OrderBy(m => m.Id)
            .Select(m => new MessageDataDTO {
                Content = m.Content,
                SenderId = m.Sender,
                //SenderName = $"{m.Sender.FirstName} {m.Sender.LastName}",
                SenderName = _context.Users.Where(u => u.Id == m.Sender).Select(u => $"{u.FirstName} {u.LastName}").First(),
                TimeSent = m.TimeSent,
                VisualFiles = null,
            })
            .AsAsyncEnumerable();
    }
}
