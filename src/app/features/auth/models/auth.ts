/**
 * Model servant lors de l'authentification d'un utilisateur
 */
export interface Auth {
    /**
     * Le login qui identifie
     */
    login: string;
    /**
     * le mot de passe associé
     */
    password: string;
}