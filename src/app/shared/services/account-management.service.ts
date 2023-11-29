import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListAccount, ReadAccount, RegisterAccount, UpdateAccount } from '../../features/account-management/models/registerAccount';
import { searchAccount } from 'src/app/features/account-management/Models/searchAccount';


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
    return this._httpClient.get<ReadAccount>(`${this._url}/${id}`);
  }
  create(registerAccount : RegisterAccount): Observable<RegisterAccount> {
    return this._httpClient.post<RegisterAccount>(`${this._url}/register`, registerAccount);
  }
  update(id : number, registerAccount : UpdateAccount) : Observable<UpdateAccount> {
    return this._httpClient.put<UpdateAccount>(`${this._url}/${id}`, registerAccount);
  }
  delete(id : number) : Observable<RegisterAccount> {
    return this._httpClient.delete<RegisterAccount>(`${this._url}/${id}`);
  }
  // requête pour la recherche list-owner
  searchUsers(criteria : searchAccount): Observable<ListAccount[]> {
    let updateUrl: string = `${this._url}/all/search`;
    return this._httpClient.post<ListAccount[]>(updateUrl, criteria)
  }
};
