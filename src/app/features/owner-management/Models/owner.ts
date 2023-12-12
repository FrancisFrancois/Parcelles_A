export interface Owner {
    lname : string;
    fname : string;
    adress: string;
    zip: string;
    city: string;
    state: string;
    country: string;
    email: string;
    phone: string;
    fax: string;
    gsm: string;
    contact: boolean;
    comment: string;
    reunion: boolean;
    manifeste: boolean;
    parcelsId : number[];
}

export interface OwnerGet {
    id : number;
    lname : string;
    fname : string;
    city: string;
    email: string;
    phone: string;
    zip:string;
    gsm: string;
    parcelsId: number[];
}
