import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountManagementService } from 'src/app/shared/services/account-management.service';

@Component({
  selector: 'app-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.scss']
})
export class ResetAccountComponent {
   /**
    * Formulaire de modification de mot de passe
    */
   resetPasswordForm : FormGroup;
 
   /**
    * constructeur du composant
    * 
    * @param _fb formbuilder créant une liaison avec le forumaire html
    * @param _accountManagementService injection de dépendance du service account management
    * @param _router injection de dépendance du service permettant de les redirection
    */
   constructor(
     private _fb : FormBuilder,
     private _accountManagementService : AccountManagementService,
     private _router : Router
     ) {
 
     this.resetPasswordForm = this._fb.group({
      password: [null, [Validators.required, Validators.maxLength(150), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      passwordVerified: [null, [Validators.required]],
     }, {
       validators: this.passwordMatchValidator
     });
   }

   /**
   * Méthode définissant le fonctionnement du Validator vérifiant que la confirmation de mot de passe à la même valeur que le mot de passe
   * 
   * @param group le formulaire contenant les champs concernés
   * @returns Une ValidationErrors si la condition n'est respecté | null si tout se passe bien
   */
  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('passwordVerified');

    if (!passwordControl || !confirmPasswordControl) {
      return null; 
    }
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  resetPassword() : void {
    if(this.resetPasswordForm.valid){
        this._accountManagementService.resetPassword(this.resetPasswordForm.value).subscribe({
          next: (response) => {
            console.log('Mot de passe reset avec succès', response);
            this._router.navigateByUrl('/auth');
          },
          error: (error) => {
            console.error('Erreur pendant le reset du mot de passe', error);
          },
          complete: () => {
            console.log('Reset du mot de passe terminé');
          }
        });
    } else {
    this.resetPasswordForm.markAllAsTouched();
  }
}
}