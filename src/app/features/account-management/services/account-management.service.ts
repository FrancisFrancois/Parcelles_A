import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  private _url: string = 'http://localhost:3000/api/account-management';

  constructor(private _httpClient: HttpClient) { }
  
}
