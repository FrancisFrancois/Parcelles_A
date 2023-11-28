import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
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
    private _navbarService: NavbarService,
    private _authService : AuthService
    ) {}

  ngOnInit(): void {
    this._authService.logout();
    this.navbarText$ = this._navbarService.navbarText$;
    this.userSub = this._authService.$connectedUser.subscribe({
      next : (value) => {
        this.connectedUser = value;
      },
      error : (error) => {
        console.error("Une erreur s'est produite lors de la souscription à l'observable $connectedUser :", error);
      }
    })
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  onLinkClick(linkText: string): void {
    this._navbarService.updateNavbarText(linkText);
  }
  
  logout(): void {
    this._authService.logout();
  }

}