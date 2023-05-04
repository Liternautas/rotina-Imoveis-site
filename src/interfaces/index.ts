export enum Role {
    super_admin = 'super_admin',
    admin = 'admin',
    realtor = 'realtor',
    collaborator = 'collaborator',
    owner = 'owner',
    customer = 'customer',
}

export interface IUser {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    document?: string;
    creci?: string;
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
    status?: string;
    numberRooms?: number;
    numberBathroom?: number;
    numberSuite?: number;
    numberGarage?: number;
    description?: string;
    price?: string;
    condominium?: string;
    iptu?: string;
    exemptIptu?: boolean;
    emphasis?: boolean;
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
    commission?: string;
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
    shorts?: string;
    signatureDate?: Date;
    start?: Date;
    end?: Date;
    fineDelay?: number;
    earlyTerminationFine?: number;
    property?: IProperty;
    owner?: IUser;
    tenant?: IUser;
    locator?: IUser;
    invoices?: IInvoice[];
    cpf?: string;
    rg?: string;
    profession?: string;
    nationality?: string;
    duration?: number;
    paymentLimit?: number;
    maritalStatus?: string;
    document?: string;
    images?: Array<string>;
    address?: IAddress;

    guarantorName?: string;
    guarantorEmail?: string;
    guarantorCpf?: string;
    guarantorRg?: string;
    guarantorProfession?: string;
    guarantorNationality?: string;
    guarantorPhone?: string;
    guarantorMaritalStatus?: string;
}

export interface IInvoice {
    id?: string;
    status?: string;
    expiration?: Date;
    payment?: Date;
    reference?: Date;
    price?: string;
    path?: string;
    voucher?: string;
    rentalContract?: IRentalContract;
    property?: IProperty;
}

export interface IBannerType {
    id?: number;
    name: string;
    banners?: IBanner[];
    width?: number;
    height?: number;
}

export interface IBanner {
    id?: number;
    name?: string;
    link?: string;
    path?: string;
    active?: boolean;
    bannerType?: IBannerType;
}

export interface ILead {
    id?: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    realtor?: IUser;
    property?: IProperty;
    type?: string;

    //financing
    nance?: Date;
    document?: string;
    monthlyIncome?: string;
    married?: boolean;
    propertyPrice?: string;
    prohibited?: string;
    financingTime?: string;

    //visit
    time?: Date;
    date?: Date;
}