using Entities;

namespace Services;

public static class Authorizer {
    public static bool MayViewTicket(
        RoleTypes role, int companyId, int creatorCompanyId
    ) {
        return role is RoleTypes.ADMIN || role is RoleTypes.VISCON ||
            companyId == creatorCompanyId;
    }

    public static bool MayViewUser(RoleTypes role, int uid, int userId) =>
        role is RoleTypes.ADMIN || uid == userId;

    public static bool HasAuthority(RoleTypes tested, RoleTypes testFor) =>
        tested <= testFor;
}
