import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  loginForm : FormGroup;
  private _urlUser : string = 'http://localhost:8080/auth/login'

  constructor(
    private _fb : FormBuilder,
    private _http : HttpClient
    ) {

    this.loginForm = this._fb.group({
      username: [null, [Validators.required, Validators.maxLength(45), Validators.pattern(/^[\D]*$/)]],
      password: [null, [Validators.required, Validators.maxLength(150), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
    });
  }

  login() : void {
    if(this.loginForm.valid) {
      this._http.post(this._urlUser, this.loginForm.value).subscribe({
        next: (res : any) => {
          console.log(res);
        }
      })
    }
  }
}