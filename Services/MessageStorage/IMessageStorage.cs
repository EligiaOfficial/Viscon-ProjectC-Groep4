using Entities;
using DTOs;

namespace Services;

public interface IMessageStorage {
    public Task AddMessage(Message message);

    public IAsyncEnumerable<Message> GetPage(int id);

    public IAsyncEnumerable<MessageDataDTO> GetMessagesByTicketId(int ticketId);
}
