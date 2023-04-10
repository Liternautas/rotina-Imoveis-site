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
    document?: string;
    avatar?: string;
    role?: string;
    rentalContracts?: IRentalContract[];
    rentalContractsLocator?: IRentalContract[];
    rentalContractsTenant?: IRentalContract[];
    salesContracts?: ISalesContract[];
    salesContractsBuyer?: ISalesContract[];
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
    condominium?: string;
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

export interface ISalesContract {
    id?: number;
    price?: string;
    paymentForm?: string;
    property?: IProperty;
    owner?: IUser;
    buyer?: IUser;
    seller?: IUser;
    date?: Date;
}
export interface IRentalContract {
    id?: number;
    price?: string;
    start?: Date;
    end?: Date;
    fineDelay?: number;
    earlyTerminationFine?: number;
    property?: IProperty;
    owner?: IUser;
    tenant?: IUser;
    locator?: IUser;
    invoices?: IInvoice[];
}

export interface IInvoice {
    id?: string;
    status?: string;
    expiration?: Date;
    payment?: Date;
    reference?: Date;
    price?: string;
    path?: string;
    rentalContract?: IRentalContract;
    property?: IProperty;
}