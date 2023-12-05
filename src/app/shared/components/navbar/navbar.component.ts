import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ReadAccount } from 'src/app/features/account-management/models/registerAccount';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  navbarText$: Observable<string> = new Observable<string>();
  connectedUser : ReadAccount | undefined;
  userSub : Subscription = new Subscription();

  constructor(
    private _authService : AuthService
    ) {}

  ngOnInit(): void {
    this.userSub = this._authService.$connectedUser.subscribe({
      next : (value) => {
        this.connectedUser = value;
        
        if(value == undefined && localStorage.getItem('parcelleToken')) {
          // option temporaire de déconnection en cas de refresh de la page et que le token est toujours présent
          // pourra être remplacé par un processus de reconnexion (nécessite un travail en Backend)
          this._authService.logout();
        }
      }
    })
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logout(): void {
    this._authService.logout();
  }

}