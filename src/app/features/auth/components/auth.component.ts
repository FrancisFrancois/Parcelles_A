import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  loginForm : FormGroup;

  constructor(
    private _fb : FormBuilder,
    private _authService : AuthService,
    private _router : Router
    ) {

    this.loginForm = this._fb.group({
      login: [null, [Validators.required, Validators.maxLength(45), Validators.pattern(/^[\D]*$/)]],
      password: [null, [Validators.required, Validators.maxLength(150), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
    });
  }

  login() : void {
    if(this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe({
        next : (response) => {
          console.log(response)
          //Action si ça se passe bien
          this._router.navigateByUrl('');
        },
        error : (error) => {
          //Action si erreur
        }
      })
    }
  }
}