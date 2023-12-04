import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * L'intercepteur servant à rajouter un Json Web Token dans l'entête des requêtes http
 */
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  /**
   * Gére une requête http donné et vérifie s'il y a un token pour l'ajouter dans l'entête
   * 
   * @param request la requête interceptée
   * @param next L'action que la requête devrait faire ensuite
   * @returns L'observable lié au next
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let token : string | null = localStorage.getItem("parcelleToken");

    if(token && token != '')
    {
      let requestClone = request.clone({setHeaders:{'Authorization' : `Bearer ${token}`}});
      return next.handle(requestClone);
    }
  
    return next.handle(request);
  }
}
