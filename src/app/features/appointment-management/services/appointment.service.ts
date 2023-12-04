import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventList } from '../models/event-list';
import { DateRange } from '../models/date-range';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private _httpClient: HttpClient, @Inject('urlBackend') private _urlBase : string) { }

  // VOIR AVEC LE BACK L'URL DE L'API et les chemins à partir de /appointment (/all, /date/:date, /create, /delete/:id, /update/:id)
  private _url: string = this._urlBase+'/appointment';



  /**
 * Récupère une liste d'évenement sur base des dates selectionnée * 
 * @param {startDate, endDate} string - Le range de date sur lequel on filtre les evenements qui doivent faire l'objet de la requete. La date doit être au format 'YYYY-MM-DD' pour pouvoir être assignée à un HttpParams
 * @return {Observable<EventList[]>} - Retourne un observable qui contient une liste d'évenement
 */
  // getByDate(startDate: string, endDate: string): Observable<EventList[]>{
  //   HttpParams permet de passer les dates de recherche dans l'url de la requete
  //   let params = new HttpParams()
  //   params.set('fromDate', startDate)
  //   params.set('endDate', endDate);

  //   let updateUrl: string = `${this._url}/date`
  //   return this._httpClient.get<EventList[]>(updateUrl, {params});
  // }

  getAll(event : Event): Observable<Event[]>{
    //HttpParams permet de passer les dates de recherche dans l'url de la requete
    let params = new HttpParams()
    params.set('fromDate', event.startDate);
    params.set('endDate', event.endDate);
    if (event.owner){
      params.set('owner', event.owner);
    }
    else if (event.user){
      params.set('user', event.user);
    }
    else if (event.parcel){
      params.set('parcel', event.parcel);
    }
    let updateUrl: string = `${this._url}/appointment`
    return this._httpClient.get<Event[]>(updateUrl, {params});
  }

 
  // requête pour la recherche list-owner
  searchEvents(event: Event): Observable<EventList[]> {
    let updateUrl: string = `${this._url}/voirBackend` //! Voir comment le backend l'a définit de son côté
    return this._httpClient.get<any>(updateUrl)
  }
}
