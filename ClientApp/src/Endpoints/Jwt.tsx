import { UserRoles } from "../UserRoles";

export function getName(data: string): string {
    const token = parseJwt(data)
    return Object(token)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
}

export function getEmail(data: string): string {
    const token = parseJwt(data)
    return Object(token)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
}

export function getPhone(data: string): string {
    const token = parseJwt(data)
    return Object(token)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"];
}

export function getLang(data: string): string {
    const token = parseJwt(data)
    return Object(token)["Lang"];
}

export function getRole(data: string): UserRoles{
    const token = parseJwt(data);
    return UserRoles[Object(token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]];
}

export function getId(data: string): string {
    const token = parseJwt(data);
    return Object(token)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
}

export function getCompany(data: string): string {
    const token = parseJwt(data);
    return Object(token)["CompanyId"];
}

export function getDepartment(data: string): string {
    const token = parseJwt(data);
    return Object(token)["DepartmentId"];
}

function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
