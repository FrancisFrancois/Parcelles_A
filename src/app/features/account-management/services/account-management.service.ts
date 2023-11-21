import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterAccount } from '../Models/registerAccount';


@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  private _url: string = 'http://localhost:8080/user';

  constructor(private _httpClient: HttpClient) { }

  getAll() : Observable<RegisterAccount[]> {
    return this._httpClient.get<RegisterAccount[]>(`${this._url}/all`);	
  }
  getById(id : number) : Observable<RegisterAccount> {
    return this._httpClient.get<RegisterAccount>(`${this._url}/user${id}`);
  }
  create(registerAccount : RegisterAccount): Observable<RegisterAccount> {
    return this._httpClient.post<RegisterAccount>(`${this._url}/create`, registerAccount);
  }
  update(id : number, registerAccount : RegisterAccount) : Observable<RegisterAccount> {
    return this._httpClient.put<RegisterAccount>(`${this._url}/update${id}`, registerAccount);
  }
  delete(id : number) : Observable<RegisterAccount> {
    return this._httpClient.delete<RegisterAccount>(`${this._url}/delete${id}`);
  }
  
};
