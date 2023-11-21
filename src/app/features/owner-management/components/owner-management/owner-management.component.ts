import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerManagementService } from '../../../../shared/services/owner-management.service';
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
    
    // Des contraintes sont appliquées aux champs
    this.registerForm = this._fb.group({
      lname: [null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^[\D]*$/)]],
      fname: [null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^[\D]*$/)]],
      adress: [null, [Validators.required, Validators.maxLength(200)]],
      zip: [null, [Validators.required,Validators.maxLength(10)]],
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
      manifeste: [null, [Validators.required, Validators.maxLength(1)]]
    });
  }

  //Création d'un propriétaire
  createOwner() {
    if (this.registerForm.valid) {  
      this._ownerManagementService.create(this.registerForm.value).subscribe({
        complete: () => {
          this._router.navigateByUrl('/'); 
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
