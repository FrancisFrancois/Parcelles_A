import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject('urlBackend') private _urlBase : string) { }
}
