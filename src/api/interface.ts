export interface IStreet {
    id: number;
    prefix: {
        id: number;
        name: string;
        shortName: string;
    };
    name: string;
    cityId: number;
    city: string;
    nameWithPrefix: string;
}

export interface IAdress {
    id: number;
    name: string;
}

export interface IRequest {
    accept: string;
}

export interface IHousing {
    accounts: any[];
    addressId: number;
    streetId: number;
    houseId: number;
    streetName: string;
    building: string;
    flat: string;
    clients: any[]
}

export interface IUserId {
    id: number,
    result: string
}

export interface IHouseUser {
    id: number,
    name: string,
    Phone: string,
    Email: string,
    BindId: number
}