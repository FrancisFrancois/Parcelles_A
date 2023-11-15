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

  create(registerAccount : RegisterAccount): Observable<any> {
    return this._httpClient.post(this._url, registerAccount);
    
  }

}
