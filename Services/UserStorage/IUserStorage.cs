namespace Services;

using System.Linq.Expressions;
using Entities;

public interface IUserStorage {
    public Task<User?> GetUser(int id);

    public Task<User?> GetUserBy(Expression<Func<User, bool>> expression);

    public Task AddUser(User user);
}
