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

  errorMessage :string|undefined;

  loginForm : FormGroup;


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
          if(response != undefined){
            this.errorMessage = undefined;
            this._router.navigateByUrl('');
          }
        }
      })
    }
  }

  ngOnInit(): void {
      next : (errormessage) => {
        this.errorMessage = errormessage;
      }
    })
  }

  ngDestroy(): void {
  }
}