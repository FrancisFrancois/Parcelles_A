import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../Models/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerManagementService {

  private _url: string = 'http://localhost:8080/owner';

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<Owner[]>{
    let updateUrl: string = `${this._url}/all/actif`
    return this._httpClient.get<Owner[]>(updateUrl);
  }
  
  getById(id: number): Observable<Owner> {
    let updateUrl: string = `${this._url}/${id}`
    return this._httpClient.get<Owner>(updateUrl);
  }


  create(Owner: Owner): Observable<Owner>{
    let updateUrl: string = `${this._url}/create`
    return this._httpClient.post<Owner>(updateUrl, Owner);
  }
  update(id: number, Owner: Owner): Observable<Owner>{
    let updateUrl: string = `${this._url}/update/${id}`
    return this._httpClient.post<Owner>(updateUrl, Owner)
  }

  delete(id: number): Observable<Owner>{
    let updateUrl: string = `${this._url}/delete/${id}`
    return this._httpClient.delete<Owner>(updateUrl)
  }

  /**
   * requête pour la recherche list-owner
   * @param changeText qui contient le texte à rechercher
   */
  searchOwners(changeText: string): Observable<Owner[]> {
    let updateUrl: string = `${this._url}/all/search`
    return this._httpClient.post<Owner[]>(updateUrl, { searchText: changeText });
  }
}
