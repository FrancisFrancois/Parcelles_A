import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReadAccount, RegisterAccount } from '../../account-management/models/registerAccount';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _urlUser : string = this._urlBase+'/auth/login'

  private _$connectedUser : BehaviorSubject<ReadAccount | undefined> = new BehaviorSubject<ReadAccount|undefined>(this.getUser());
  
  $connectedUser : Observable< ReadAccount | undefined> = this._$connectedUser.asObservable();
  
  private _connectedUser : ReadAccount|undefined;

  private getUser(): ReadAccount|undefined{
    return this._connectedUser;
  }
  constructor(@Inject('urlBackend') private _urlBase : string,
    private _httpClient: HttpClient) { }

  login(authForm : Auth) :Observable<ReadAccount | undefined>{
    this._httpClient.post<any>(this._urlUser, authForm).subscribe({
      next : (response) => {
        //gestion de l'objet user reçu TODO A changer
        let temp : ReadAccount = {
          id:-1,
          username : response.login,
          firstName:'temp',
          lastName:'temp',
          email:'temp@a.changer',
          phoneNumber: 'nepasderanger',
          roles: ['ADMIN'],
          blocked : false
        }
        localStorage.setItem("parcelleUserId",temp.username);
        //Token
        localStorage.setItem("parcelleToken", response.token);
        //Revoit de l'observable
        this._$connectedUser.next(temp);
      }
    })
    return this.$connectedUser;
  }

  logout():void{
    //clean localstorage
    localStorage.removeItem('parcelleUserId');
    localStorage.removeItem('parcelleToken');

    //clean l'objet user connecté
    this._$connectedUser.next(undefined);
  }
}
