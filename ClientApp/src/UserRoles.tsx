export enum UserRoles {
    ADMIN = 0,
    VISCON = 1,
    KEYUSER = 2,
    USER = 3,
    NONE = 4
}

export function getRoleKey(roleNumber: number): string | undefined {
    for (const key in UserRoles) {
        if (typeof UserRoles[key] === 'number' && UserRoles[key] === roleNumber) {
            return key;
        }
    }
    return undefined;
}