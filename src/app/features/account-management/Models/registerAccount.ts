export interface RegisterAccount {
    id: number | undefined;
    username : string;
    firstName : string;
    lastName : string;
    email : string;
    phone : string;
    actif : boolean;
    password : string;
    roles : string[];
}
