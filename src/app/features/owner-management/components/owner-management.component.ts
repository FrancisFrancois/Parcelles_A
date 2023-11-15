import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerManagementService } from '../services/owner-management.service';
@Component({
  selector: 'app-owner-management',
  templateUrl: './owner-management.component.html',
  styleUrls: ['./owner-management.component.scss']
})
export class OwnerManagementComponent {
  registerForm: FormGroup;

  
  constructor(
    private _fb : FormBuilder,
    private _ownerManagementService: OwnerManagementService,
    private _router: Router
  ) {
    

    // Revoir les validators
    this.registerForm = this._fb.group({
      lname: [null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^[\D]*$/)]],
      fname: [null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^[\D]*$/)]],
      adress: [null, [Validators.required, Validators.maxLength(200)]],
      zip: [null, [Validators.required]], // Ne pas limiter à 4 chiffres
      city: [null, [Validators.required, Validators.maxLength(100)]],
      state: [null, [Validators.required, Validators.maxLength(20)]],
      country: [null, [Validators.required, Validators.maxLength(45)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.maxLength(45)]],
      fax: [null, [Validators.required, Validators.maxLength(45)]],
      gsm: [null, [Validators.required, Validators.maxLength(45)]],
      contact: [null, [Validators.required, Validators.maxLength(1)]],
      comment: [null, [Validators.required, Validators.maxLength(1)]],
      reunion: [null, [Validators.required, Validators.maxLength(1)]],
    });
  }


  // Pas de mot de passe ici
  // passwordMatchValidator(group: FormGroup): ValidationErrors | null {
  //   const passwordControl = group.get('password');
  //   const confirmPasswordControl = group.get('confirmpassword');

  //   if (!passwordControl || !confirmPasswordControl) {
  //     return null; 
  //   }
  //   const password = passwordControl.value;
  //   const confirmPassword = confirmPasswordControl.value;

  //   return password === confirmPassword ? null : { 'passwordMismatch': true };
  // }

  // createUser() {
  //   if (this.registerForm.valid) {  
  //     this._accountManagementService.create(this.registerForm.value).subscribe({
  //       complete: () => {
  //         this._router.navigateByUrl('/'); 
  //       }
  //     });
  //     console.log(this.registerForm.value); 
  //     console.log("FORMULAIRE VALIDE");
  //   } else {

  //     this.registerForm.markAllAsTouched();
  //     console.log("FORMULAIRE INVALIDE");
  //   }
  // }

}
