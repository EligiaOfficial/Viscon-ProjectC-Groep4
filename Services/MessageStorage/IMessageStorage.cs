using Entities;

namespace Services;

public interface IMessageStorage {
    public Task AddMessage(Message message);

    public IAsyncEnumerable<Message> GetPage(int id);

    public IAsyncEnumerable<Message> GetMessagesByTicketId(int ticketId);
}
