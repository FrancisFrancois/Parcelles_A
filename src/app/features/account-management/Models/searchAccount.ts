/**
 * Format des différents critères pour affiner la liste des utilisateurs
 */
export interface searchAccount
{
  /**
   * Contient une chaine de caractère pour trouver tous les utilisateur dont leur **prénom** la contient
   * 
   * S'il est vide, il sera null
   */
  firstName: string|null,
  /**
   * Contient une chaine de caractère pour trouver tous les utilisateur dont leur **nom** la contient
   * 
   * S'il est vide, il sera null
   */
  lastName: string|null,
  /**
   * Contient une chaine de caractère pour trouver tous les utilisateur dont leur **email** la contient
   * 
   * S'il est vide, il sera null
   */
  email: string|null,
  /**
   * Contient un boolean pour trouver tous les utilisateurs marqués comme actif ou pas
   * 
   * S'il est vide, il sera null
   */
  blocked: boolean|null
}