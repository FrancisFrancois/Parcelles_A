import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReadAccount } from '../../account-management/models/registerAccount';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  loginForm : FormGroup;
  connectedUser : ReadAccount | undefined;
  userSub : Subscription = new Subscription();

  constructor(
    private _fb : FormBuilder,
    private _authService : AuthService,
    private _router : Router
    ) {

    this.loginForm = this._fb.group({
      login: [null, [Validators.required, Validators.maxLength(45)]],
      password: [null, [Validators.required, Validators.maxLength(150)]],
    });
  }

  login() : void {
    if(this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe({
        next : (response) => {
          //Action si ça se passe bien
          this._router.navigateByUrl('');
        },
        error : (error) => {
          //Action si erreur
        }
      })
    }
  }

  ngOnInit(): void {
    this.userSub = this._authService.$connectedUser.subscribe({
      next : (value) => {
        this.connectedUser = value;
      },
      error : (error) => {
        console.error("Une erreur s'est produite lors de la souscription à l'observable $connectedUser :", error);
      }
    });
  }

  ngDestroy(): void {
    this.userSub.unsubscribe();
  }

}