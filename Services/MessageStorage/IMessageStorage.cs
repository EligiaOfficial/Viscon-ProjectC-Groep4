using Entities;

namespace Services;

interface IMessageStorage {
    public Task AddMessage(Message message);

    public IAsyncEnumerable<Message> GetPage(int id);
}
