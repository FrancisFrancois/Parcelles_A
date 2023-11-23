import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NavbarService {
  
  private _navbarTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  navbarText$: Observable<string> = this._navbarTextSubject.asObservable();
  updateNavbarText(text: string): void {
    this._navbarTextSubject.next(text);
  }
}