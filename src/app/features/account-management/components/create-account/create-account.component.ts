import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AccountManagementService } from '../../services/account-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  registerForm: FormGroup;

  
  constructor(
    private _fb : FormBuilder,
    private _accountManagementService: AccountManagementService,
    private _router: Router
    ) {
    this.registerForm = this._fb.group({
      lastName: [null, [Validators.required, Validators.pattern(/^[\D]*$/)]],
      firstName: [null, [Validators.required, Validators.pattern(/^[\D]*$/)]],
      username: [null, [Validators.required, Validators.pattern(/^[\D]*$/)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      confirmpassword: [null, [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmpassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null; 
    }
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  createUser() {
    if (this.registerForm.valid) {  
      this._accountManagementService.create(this.registerForm.value).subscribe({
        next: (response) => {
          console.log("Utilisateur créé avec succès:", response);
          this._router.navigateByUrl('/');
        },
        error: (error) => {
          console.error("Une erreur s'est produite lors de la création de l'utilisateur:", error);
        },
        complete: () => {
          console.log("Création de l'utilisateur terminée.");
        }
      });
      console.log(this.registerForm.value); 
      console.log("FORMULAIRE VALIDE");
    } else {
      this.registerForm.markAllAsTouched();
      console.log("FORMULAIRE INVALIDE");
    }
  }
}
