import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner, OwnerGet } from '../models/owner';
import { searchOwner } from '../Models/searchOwner';

@Injectable({
  providedIn: 'root'
})
export class OwnerManagementService {

  private _url: string = this._urlBase+'/owner';

  constructor(private _httpClient: HttpClient,
    @Inject('urlBackend') private _urlBase : string) { }

  getAll(): Observable<OwnerGet[]>{
    let updateUrl: string = `${this._url}/all`;
    return this._httpClient.get<OwnerGet[]>(updateUrl);
  }
  
  getById(id: number): Observable<OwnerGet> {
    let updateUrl: string = `${this._url}/${id}`;
    return this._httpClient.get<OwnerGet>(updateUrl);
  }

  create(Owner: Owner): Observable<Owner>{
    let updateUrl: string = `${this._url}/create`
    return this._httpClient.post<Owner>(updateUrl, Owner);
  }
  update(id: number, Owner: Owner): Observable<Owner>{
    let updateUrl: string = `${this._url}/update/${id}`;
    return this._httpClient.put<Owner>(updateUrl, Owner);
  }

  delete(id: number): Observable<Owner>{
    let updateUrl: string = `${this._url}/${id}`;
    return this._httpClient.delete<Owner>(updateUrl);
  }

  /**
   * requête pour la recherche list-owner
   * @param searchOwner qui contient un formulaire avec les valeurs pour affiner la liste
   */
  searchOwners(searchOwner : searchOwner): Observable<OwnerGet[]> {
    let updateUrl: string = `${this._url}/all/search`;
    return this._httpClient.post<OwnerGet[]>(updateUrl, searchOwner);
  }
}
