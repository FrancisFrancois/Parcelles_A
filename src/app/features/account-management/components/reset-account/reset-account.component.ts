import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.scss']
})
export class ResetAccountComponent {
   /**
   * Variable qui contient les éventuelles messages d'erreur
   * 
   * il est **undefined** lorsqu'il est vide
   */
   errorMessage :string|undefined;

   /**
    * Formulaire de login
    */
   resetPasswordForm : FormGroup;
 
   /**
    * constructeur du composant
    * 
    * @param _fb formbuilder créant une liaison avec le forumaire html
    * @param _authService injection de dépendance du service d'authentification
    * @param _router injection de dépendance du service permettant de les redirection
    */
   constructor(
     private _fb : FormBuilder,
     private _authService : AuthService,
     private _router : Router
     ) {
 
     this.resetPasswordForm = this._fb.group({
      password: [null, [Validators.required, Validators.maxLength(150), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      passwordVerified: [null, [Validators.required]],
     });
   }

}
