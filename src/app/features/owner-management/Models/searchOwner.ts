/**
 * Format des différents critères pour affiner la liste des propriétaires
 */
export interface searchOwner{
    /**
     * Contient une chaine de caractère pour trouver tous les propriétaires dont leur **prénom** la contient
     * 
     * S'il est vide, il sera null
     */
    fname: string|null,
    /**
     * Contient une chaine de caractère pour trouver tous les propriétaires dont leur **nom** la contient
     * 
     * S'il est vide, il sera null
     */
    lname: string|null,
    /**
     * Contient une chaine de caractère pour trouver tous les propriétaires dont leur **code postal** la contient
     * 
     * S'il est vide, il sera null
     */
    zip: string|null,
    /**
     * Contient une chaine de caractère pour trouver tous les propriétaires dont leur **villes** la contient
     * 
     * S'il est vide, il sera null
     */
    city: string|null,
    /**
     * Contient une chaine de caractère pour trouver tous les propriétaires dont leur **email** la contient
     * 
     * S'il est vide, il sera null
     */
    email: string|null
}