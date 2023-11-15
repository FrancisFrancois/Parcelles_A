import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterAccount } from '../models/registerAccount';


@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  private _url: string = '';

  constructor(private _httpClient: HttpClient) { }

  getAll() : Observable<RegisterAccount[]> {
    return this._httpClient.get<RegisterAccount[]>(this._url);
  }
  getById(id : number) : Observable<RegisterAccount> {
    return this._httpClient.get<RegisterAccount>(this._url+id);
  }
  create(registerAccount : RegisterAccount): Observable<RegisterAccount> {
    return this._httpClient.post<RegisterAccount>(this._url, registerAccount);
  }
  update(id : number, registerAccount : RegisterAccount) : Observable<RegisterAccount> {
    return this._httpClient.put<RegisterAccount>(this._url+id, registerAccount);
  }
  delete(id : number) : Observable<RegisterAccount> {
    return this._httpClient.delete<RegisterAccount>(this._url+id);
  }

}
