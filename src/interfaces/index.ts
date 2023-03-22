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
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    avatar?: string;
    role?: string;
}

export interface IPropertyType {
    id?: number;
    name?: string;
    slug?: string;
}

export enum AdType {
    aluguel = 'aluguel',
    venda = 'venda'
}

export interface IDetail {
    id: number;
    name: string;
    slug: string;
}

export interface IProperty {
    id?: number;
    code?: string;
    adType?: string;
    numberRooms?: number;
    numberBathroom?: number;
    numberSuite?: number;
    numberGarage?: number;
    description?: string;
    price?: string;
    iptu?: string;
    exemptIptu?: boolean;
    usefulArea?: number;
    totalArea?: number;
    images?: Array<string>;
    type?: IPropertyType;
    address?: IAddress;
    pickup?: IUser;
    owner?: IUser;
    favorites?: IUser;
    details?: IDetail[] | any;
} 

export interface IDetail {
    id: number;
    name: string;
    slug: string;
    type: string;
}

export type IState = {
    id?: number;
    name?: string;
    shortName?: string;
    region?: string;
    cities?: ICity[];
    addresses?: IAddress[];
}

export type ICity = {
    id?: number;
    ibgeId?: number;
    apiId?: number;
	name?: string;
    state?: IState;
    districts?: IDistrict[];
    addresses?: IAddress[];
}

export type IDistrict = {
    id?: number;
    apiId?: number;
    name?: string;
    city?: ICity;
    addresses?: IAddress[];
}

export type IAddress = {
    id?: string;
    nation?: string;
    state?: IState;
    city?: ICity;
    district?: IDistrict;
    route?: string;
    complement?: string;
    number?: number;
    zipcode?: string;
    place_id?: string;
    formatted_address?: string;
    location?: any;
    property?: IProperty;
}