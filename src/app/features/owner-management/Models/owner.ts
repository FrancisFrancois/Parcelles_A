export interface Owner {
    id : number;
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
}

export interface OwnerUpdate {
    id : number;
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
}