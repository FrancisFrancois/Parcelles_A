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
        //if(value != undefined) 
        this.connectedUser = value;
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