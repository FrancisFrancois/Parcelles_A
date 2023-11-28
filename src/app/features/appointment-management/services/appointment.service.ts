import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventList } from '../models/event-list';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private _httpClient: HttpClient, @Inject('urlBackend') private _urlBase : string) { }

  private _url: string = this._urlBase+'/appointment';

  getAll(): Observable<EventList[]>{
    let updateUrl: string = `${this._url}/all`
    return this._httpClient.get<EventList[]>(updateUrl);
  }
  
  getById(id: number): Observable<EventList> {
    let updateUrl: string = `${this._url}/${id}`
    return this._httpClient.get<EventList>(updateUrl);
  }

  create(Event: EventList): Observable<EventList>{
    let updateUrl: string = `${this._url}/create`
    return this._httpClient.post<EventList>(updateUrl, Event);
  }

  update(id: number, Event: EventList): Observable<Event>{
    let updateUrl: string = `${this._url}/update/${id}`
    return this._httpClient.put<Event>(updateUrl, Event)
  }

  delete(id: number): Observable<Event>{
    let updateUrl: string = `${this._url}/delete/${id}`
    return this._httpClient.delete<Event>(updateUrl)
  }

  // requête pour la recherche list-owner
  searchOwners(changeText: string): Observable<EventList[]> {
    let updateUrl: string = `${this._url}/voirBackend` //! Voir comment le backend l'a définit de son côté
    return this._httpClient.get<any>(updateUrl)
  }
}
