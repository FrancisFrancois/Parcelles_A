/**
 * Modèle représentant un événement dans l'application.
 * Utilisé pour la création, la mise à jour et l'affichage des détails des événements.
 */
export interface Event {
    /**
     * Identifiant unique de l'événement. Peut être absent (undefined).
     */
    id? : number | undefined ;
    /**
     * Date de début de l'événement, sous forme de chaîne de caractères.
     */
    startDate : string;
    /**
     * Date de fin de l'événement, sous forme de chaîne de caractères.
     */
    endDate : string;
    /**
     * Nom ou identifiant du propriétaire de la parcelle. Peut être null si non spécifié.
     */
    owner : string | null;
    /**
     * Nom ou identifiant de l'utilisateur (employé) associé à l'événement. Peut être null si non spécifié.
     */
    user : string | null;
    /**
     * Référence à la parcelle associée à l'événement. Peut être null si non spécifié.
     */
    parcel : string | null;   
}
