import { Component, EventEmitter, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReadAccount } from 'src/app/features/account-management/models/registerAccount';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  outputs:['onVisibilityChange']
})
export class SidebarComponent implements OnInit {

  private _userSub : Subscription = new Subscription();
  private _connectedUser : ReadAccount | undefined;

  onVisibilityChange : EventEmitter<boolean>;

  constructor(private _authService : AuthService) {
    this.onVisibilityChange = new EventEmitter<boolean>();
  }

  ngOnInit():void{
    this._userSub = this._authService.$connectedUser.subscribe({
      next : (value) => {
        this._connectedUser = value;
        this.onVisibilityChange.emit(this.isUserConnected());
      }
    })
  }

  isUserConnected() : boolean {
    // TODO A retirer dans la version definitve
    if(!environment.production) return true;
    return this._connectedUser != undefined;
  } 

  hasSecretaryRight() : boolean {
    return this._authService.hasSecretaryRight();
  }

  getUserId() : number {
    return this._connectedUser!.id!;
  }

  ngOnDestroy(): void {
    this._userSub.unsubscribe();
  }

}