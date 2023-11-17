export interface RegisterAccount {
    id: number | undefined;
    username : string;
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    roles : string[];
}
