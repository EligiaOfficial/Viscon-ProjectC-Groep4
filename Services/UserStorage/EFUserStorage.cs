using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Entities;
using Viscon_ProjectC_Groep4;

namespace Services;

public class EFUserStorage : IUserStorage {
    private readonly ApplicationDbContext _context;

    public EFUserStorage(ApplicationDbContext context) {
        _context = context;
    }

    public async Task<User?> GetUser(int id) =>
        await _context.Users.SingleAsync(u => u.Id == id);

    public async Task<User?> GetUserBy(Expression<Func<User, bool>> expression) {
        return await _context.Users.Where(expression).FirstOrDefaultAsync();
    }

    public async Task AddUser(User user) {
        await _context.AddAsync(user);
        await _context.SaveChangesAsync();
    }
}
