import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListAccount, ReadAccount, RegisterAccount, UpdateAccount } from '../../features/account-management/models/registerAccount';


@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  private _url: string = this._urlBase+'/user';

  constructor(private _httpClient: HttpClient,
    @Inject('urlBackend') private _urlBase : string) { }

  getAll() : Observable<ListAccount[]> {
    return this._httpClient.get<ListAccount[]>(`${this._url}/all`);	
  }
  getById(id : number) : Observable<ReadAccount> {
    return this._httpClient.get<ReadAccount>(`${this._url}/user${id}`);
  }
  create(registerAccount : RegisterAccount): Observable<RegisterAccount> {
    return this._httpClient.post<RegisterAccount>(`${this._url}/create`, registerAccount);
  }
  update(id : number, registerAccount : UpdateAccount) : Observable<UpdateAccount> {
    return this._httpClient.put<UpdateAccount>(`${this._url}/update${id}`, registerAccount);
  }
  delete(id : number) : Observable<RegisterAccount> {
    return this._httpClient.delete<RegisterAccount>(`${this._url}/delete${id}`);
  }
};
