export interface RegisterAccount {
    lastName : string;
    firstName : string;
    roles : string[];
    password : string;
    passwordVerified : string;
    email : string;
    phoneNumber : string;
}

export interface UpdateAccount {
    lastName : string;
    firstName : string;
    roles : string[];
    email : string;
    phoneNumber : string;
    blocked : boolean;
}

export interface ListAccount {
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


