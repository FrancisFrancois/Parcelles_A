import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerManagementService } from '../../services/owner-management.service';
import { Owner } from '../../models/owner';
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
      lname: [null, [Validators.required, Validators.maxLength(100)]],
      fname: [null, [Validators.required, Validators.maxLength(100)]],
      adress: [null, [Validators.required, Validators.maxLength(200)]],
      zip: [null, [Validators.required,Validators.maxLength(10)]],
      city: [null, [Validators.required, Validators.maxLength(100)]],
      state: [null, [Validators.required, Validators.maxLength(20)]],
      country: [null, [Validators.required, Validators.maxLength(45)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.maxLength(45)]],
      fax: [null, [Validators.maxLength(45)]],
      gsm: [null, [Validators.maxLength(45)]],
      contact: [false, []],
      comment: [null, [Validators.maxLength(250)]],
      reunion: [false, []],
      manifeste: [false, []]
    });
  }

  /**
   * @function createOwner permet de creer un owner via le service OwnerManagementService
   */
  createOwner() {
    if (this.registerForm.valid) {  
      let ownerToCreate : Owner = this.registerForm.value;
      //ownerToCreate.contact = this.registerForm.controls["contact"] ? '1' : '0';
      //ownerToCreate.manifeste = this.registerForm.controls["manifeste"] ? '1' : '0';
      //ownerToCreate.reunion = this.registerForm.controls["reunion"] ? '1' : '0';

      this._ownerManagementService.create(ownerToCreate).subscribe({
        next : (response) => {
          this._router.navigateByUrl('dashboard'); 
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
