import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerManagementService } from '../../services/owner-management.service';
@Component({
  selector: 'app-owner-management',
  templateUrl: './owner-management.component.html',
  styleUrls: ['./owner-management.component.scss']
})
export class OwnerManagementComponent {
  /*
  le registerForm permet de valider les champs du formulaire avant de les envoyer
  */
  registerForm: FormGroup;

  
  constructor(
    /**
     * @param _fb permet de valider les champs
     * @param _ownerManagementService on appelle le service contenant la requête create Owner
     * @param _router  afin de se rendre à une autre page après création du owner, destination  à déterminer :)
     */
    private _fb : FormBuilder,
    private _ownerManagementService: OwnerManagementService,
    private _router: Router
  ) {
    
    /** 
     * les contraintes appliquées aux champs sont les suivantes :
     */
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
      comment: [null, [Validators.required, Validators.maxLength(250)]],
      reunion: [null, [Validators.required, Validators.maxLength(1)]],
      manifeste: [null, [Validators.required, Validators.maxLength(1)]],
      parcelsId: [null, [Validators.maxLength(1)]],
    });
  }

  /**
   * @function createOwner permet de creer un owner via le service OwnerManagementService
   */
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
