import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-management',
  templateUrl: './owner-management.component.html',
  styleUrls: ['./owner-management.component.scss']
})
export class OwnerManagementComponent {
  registerForm: FormGroup;

  constructor(
    private _fb : FormBuilder,
    private _router: Router
    ) {
    this.registerForm = this._fb.group({
      lastname: [null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^[\D]*$/)]],
      firstname: [null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^[\D]*$/)]],
      username: [null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^[\D]*$/)]],
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
      return null; // Si l'un des contrôles est absent, retournez null (pas d'erreur).
    }
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;
    // Vérifie si les mots de passe correspondent, sinon retourne une erreur.
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  createUser() {
    if (this.registerForm.valid) {  
      this._accountManagementService.create(this.registerForm.value).subscribe({
        complete: () => {
          this._router.navigateByUrl('/'); // Redirige vers la page d'acceuil
        }
      });
      console.log(this.registerForm.value); // Affiche les valeurs du formulaire dans la console.
      console.log("FORMULAIRE VALIDE");
    } else {
      // Marque tous les champs du formulaire comme "touched" pour afficher les erreurs.
      this.registerForm.markAllAsTouched();
      console.log("FORMULAIRE INVALIDE");
    }
  }
}
