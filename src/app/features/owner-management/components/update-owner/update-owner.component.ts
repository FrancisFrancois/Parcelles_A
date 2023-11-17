import { Component, OnInit } from '@angular/core';
import { OwnerManagementService } from '../../services/owner-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-owner',
  templateUrl: './update-owner.component.html',
  styleUrls: ['./update-owner.component.scss']
})
export class UpdateOwnerComponent implements OnInit {

  registerForm: FormGroup;
  ownerID: number;
  
  constructor(
    private _fb: FormBuilder,
    private _ownerManagementService: OwnerManagementService,
    private _router: Router
  ) {
    
    this.registerForm = this._fb.group({
      lname: [null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^[\D]*$/)]],
      fname: [null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^[\D]*$/)]],
      adress: [null, [Validators.required, Validators.maxLength(200)]],
      zip: [null, [Validators.required, Validators.maxLength(10)]],
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
    this.ownerID = +this
  }
  ngOnInit(): void {
    this._ownerManagementService.getById(this.ownerID).subscribe({
      next: (owner) => {
        this.registerForm.patchValue(owner);
      }
    })
  }

  // Modifier/Supprimer un propriétaire

  //modification du propriétaire
  updateOwner(): void {
    this._ownerManagementService.update(this.ownerID, this.registerForm.value).subscribe({
      next: () => {
        console.log('L\'utilisateur a été mis à jour');
        this._router.navigate(['/']);
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur:', error);
      },
      complete: () => {
        console.log('La mise à jour de l\'utilisateur est terminée');
      }
      
    });
  }
  // Supprimer un propriétaire
    // deleteOwner(id : number) {
    //   this._ownerManagementService.delete(id).subscribe({
    //     next: (response) => {
    //       console.log("Propriétaire supprimé avec succès:", response);
    //       this._router.navigateByUrl('/');
    //     },
    //     error: (error) => {
    //       console.error("Une erreur s'est produite lors de la suppression de l'utilisateur:", error);
    //     },
    //     complete: () => {
    //       console.log("Suppression de l'utilisateur terminée.");
    //     }
    //   });
    // }
  }
