import { IUser } from "../interfaces";

export function checkCustomer(token: string, userData: string) {
    if (!token || !userData) {
        return false;
    }
    const user: IUser = JSON.parse(userData);
    if(user.role != 'customer') {
        return false;
    }
    return true;
}
export function checkNotCustomer(token: string, userData: string) {
    if (!token || !userData) {
        return false;
    }
    const user: IUser = JSON.parse(userData);
    if(user.role === 'customer') {
        return false;
    }
    return true;
}