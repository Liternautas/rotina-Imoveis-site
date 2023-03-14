export enum Role {
    super_admin = 'super_admin',
    admin = 'admin',
    realtor = 'realtor',
    collaborator = 'collaborator',
    owner = 'owner',
    customer = 'customer'
}

export interface IUser {
    id?: string;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    avatar?: string;
    role?: string;
}