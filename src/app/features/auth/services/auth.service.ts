import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterAccount } from '../../account-management/models/registerAccount';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _urlUser : string = 'http://localhost:8080/auth/login'

  constructor(private _httpClient: HttpClient) { }

}
