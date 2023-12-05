import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

/**
 * Service pour gérer les requêtes HTTP liées aux rendez-vous.
 * Fournit une méthode searchEvents() pour la recherche des rendez-vous basé sur un objet Event.
 * 
 * @Injectable - Indique que ce service peut être injecté dans d'autres classes.
 * @param {HttpClient} _httpClient - Le client HTTP utilisé pour les requêtes.
 * @param {string} _urlBase - L'URL de base du backend, disponible dans le app.module.ts et injectée lors de la création du service.
 */
@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  /**
   * Constructeur du service.
   * @param {HttpClient} _httpClient - Le client HTTP pour effectuer des requêtes.
   * @param {string} _urlBase - L'URL de base du backend.
   */
  constructor(private _httpClient: HttpClient, @Inject('urlBackend') private _urlBase : string) { }
  /**
   * URL de base pour les requêtes relatives aux rendez-vous.
   * Construite à partir de l'URL de base du backend.
   */
  private _url: string = this._urlBase+'/appointment';
 
   /**
   * Recherche des événements correspondant au critère fourni par (event: Event).
   * Envoie une requête HTTP GET à l'URL définie pour récupérer les événements.
   *
   * @param {Event} event - L'événement à rechercher.
   * @returns {Observable<Event[]>} Un Observable qui émet un tableau d'événements correspondants.
   */
  searchEvents(event: Event): Observable<Event[]> {
    let updateUrl: string = `${this._url}/voirBackend` //! Voir comment le backend l'a définit de son côté
    return this._httpClient.get<any>(updateUrl)
  }
  /** Méthode permettant la création d'un rendez-vous
   * 
   * @param registerAccount objet contenant les données du rendez-vous
   * @returns l'observable de la requête
   */
  createEvents(event: Event):Observable<Event>{
    return this._httpClient.post<Event>(`${this._url}/create`, event);
  }
}