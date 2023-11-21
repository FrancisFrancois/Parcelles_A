import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Inceptor used to add jwtToken in http request header
 */
@Injectable()
export class AuthTokenInterceptorInterceptor implements HttpInterceptor {

  /**
   * Handles a given http request and check if there is a token to add in it
   * 
   * @param request the intercepted request
   * @param next Action of requested is supposed to do after
   * @returns The Observable linked to next
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let token : string | null = localStorage.getItem("tokenParcelle");

    if(token && token != '')
    {
      let requestClone = request.clone({setHeaders:{'Authorization' : `Bearer ${token}`}});
      return next.handle(requestClone);
    }
    

    return next.handle(request);
  }
}
