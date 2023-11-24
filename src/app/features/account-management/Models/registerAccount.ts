export interface RegisterAccount {
    lastname : string;
    firstname : string;
    roles : string[];
    password : string;
    passwordVerified : string;
    email : string;
    phoneNumber : string;
}

export interface UpdateAccount {
    lastname : string;
    firstname : string;
    roles : string[];
    email : string;
    phoneNumber : string;
    blocked : boolean;
}

export interface ListAccount {
    id: number | undefined;
    username : string;
    firstname : string;
    lastname : string;
    email : string;
    roles : string[];
    phoneNumber : string;
    blocked : boolean;
}

export interface ReadAccount {
    id: number | undefined;
    username : string;
    firstname : string;
    lastname : string;
    email : string;
    roles : string[];
    phoneNumber : string;
    blocked : boolean;
}


