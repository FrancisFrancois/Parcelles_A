/**
 * Modèle utilisé lors de la création d'un utilsateur
 */
export interface RegisterAccount {
    /**
     * nom
     */
    lastName : string;
    /**
     * prénom
     */
    firstName : string;
    /**
     * roles (mutiple possible)
     */
    roles : string[];
    /**
     * mot de passe
     */
    password : string;
    /**
     * confirmation du mot de passe
     */
    passwordVerified : string;
    /**
     * email
     */
    email : string;
    /**
     * numéro de téléphone
     */
    phoneNumber : string;
}

/**
 * Modèle utilisé lors de la mise à jour des informations d'un utilsateur
 */
export interface UpdateAccount {
    /**
     * nom
     */
    lastName : string;
    /**
     * prénom
     */
    firstName : string;
    /**
     * roles (multiples possibles)
     */
    roles : string[];
    /**
     * email
     */
    email : string;
    /**
     * numéro de téléphone
     */
    phoneNumber : string;
    /**
     * boolean précisant si l'utilisateur a été désactivé
     */
    blocked : boolean;
}

/**
 * Modèle utilisé dans l'affichage en liste de plusieurs utilisateurs
 */
export interface ListAccount {
    /**
     * Identifiant qui sera utilisé pour appliquer des actions sur l'utilisateur sélectionné
     */
    id: number | undefined;
    /**
     * le login de l'utilisateur
     */
    username : string;
    /**
     * prénom
     */
    firstName : string;
    /**
     * nom
     */
    lastName : string;
    /**
     * email
     */
    email : string;
    /**
     * roles (multiples possibles)
     */
    roles : string[];
    /**
     * numéro de téléphone
     */
    phoneNumber : string;
    /**
     * boolean précisant si l'utilisateur a été désactivé
     */
    blocked : boolean;
}

/**
 * Modèle utilisé durant le visinnage détaillé des informations d'un seul utilisateur
 */
export interface ReadAccount {
    /**
     * Identifiant qui sera utilisé pour appliquer des actions sur l'utilisateur sélectionné
     */
    id: number | undefined;
    /**
     * le login de l'utilisateur
     */
    username : string;
    /**
     * prénom
     */
    firstName : string;
    /**
     * nom
     */
    lastName : string;
    /**
     * email
     */
    email : string;
    /**
     * roles (multiples possibles)
     */
    roles : string[];
    /**
     * numéro de téléphone
     */
    phoneNumber : string;
    /**
     * boolean précisant si l'utilisateur a été désactivé
     */
    blocked : boolean;
}

/**
 * Modèle utilisé lors de la récupération d'un mot de passe
 */
export interface ResetPassword  {
    /**
     * mot de passe
     */
    password : string;
    /**
     * confirmation du mot de passe
     */
    passwordVerified : string;
    /**
     * email
     */
}
