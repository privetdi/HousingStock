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




export interface MyRequest {
    accept: string;
}


export interface Housing {
    accounts: any[];
    addressId: number;
    streetId: number;
    houseId: number;
    streetName: string;
    building: string;
    flat: string;
    clients: any[]
}


export interface UserId {
    id: number,
    result: string
}


export interface HouseUser {
    id: number,
    Name: string,
    Phone: string,
    Email: string,
    BindId: number
}