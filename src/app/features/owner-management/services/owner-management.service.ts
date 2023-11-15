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

  create(Owner: Owner): Observable<any>{
    let updateUrl: string = `${this._url}/create`;
    return this._httpClient.post(updateUrl, Owner);
  }
  update(id: number, Owner: Owner): Observable<Owner>{
    let updateUrl: string = `${this._url}/update/${id}`;
    return this._httpClient.put<Owner>(updateUrl, Owner)
  }
}
