export interface RegisterAccount {
    id: number | undefined;
    username : string;
    firstName : string;
    lastName : string;
    email : string;
    phoneNumber : string;
    actif : boolean;
    password : string;
    roles : string[];
}

export interface UpdateAccount {
    id: number | undefined;
    firstName : string;
    lastName : string;
    roles : string[];
    email : string;
    phoneNumber : string;
    blocked : boolean;
}

export interface listAccount {
    id: number | undefined;
    username : string;
    firstName : string;
    lastName : string;
    email : string;
    roles : string[];
    phoneNumber : string;
    blocked : boolean;
}

export interface ReadAccount {
    id: number | undefined;
    username : string;
    firstName : string;
    lastName : string;
    email : string;
    roles : string[];
    phoneNumber : string;
    blocked : boolean;
}


