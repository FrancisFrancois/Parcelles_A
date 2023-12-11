import { Component, OnInit } from '@angular/core';
import { OwnerManagementService } from '../../services/owner-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-owner',
  templateUrl: './update-owner.component.html',
  styleUrls: ['./update-owner.component.scss'],
})
export class UpdateOwnerComponent implements OnInit {
  /**Le registerForm permet de valider les champs
   * Le ownerID permet de reprendre l'id
   */
  registerForm: FormGroup;
  ownerID: number;
  /**
   * @param _fb permet de valider les champs
   * @param _ownerManagementService on appelle le service contenant la requête update Owner
   * @param _router  afin de se rendre à une autre page après maj du owner, destination  à déterminer
   */
  constructor(
    private _fb: FormBuilder,
    private _ownerManagementService: OwnerManagementService,
    private _router: Router,
    private _activeRoute: ActivatedRoute
  ) /* les contraintes appliquées aux champs sont les suivantes :*/
  {
    this.ownerID = this._activeRoute.snapshot.params['id'];
    this.registerForm = this._fb.group({
      lname: [
        null,
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern(/^[\D]*$/),
        ],
      ],
      fname: [
        null,
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern(/^[\D]*$/),
        ],
      ],
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
      manifeste: [null, [Validators.required, Validators.maxLength(1)]],
      parcelsId: [null, [Validators.maxLength(1)]],

    });
  }
  /* permet de reprendre l'id pour afficher le propriétaire dès le chargement de la page*/
  ngOnInit(): void {
    this._ownerManagementService.getById(this.ownerID).subscribe({
      next: (owner) => {
        this.registerForm.patchValue(owner);
      },
    });
  }

  /* Permet de mettre à jour le propriétaire*/
  updateOwner(): void {
    this._ownerManagementService
      .update(this.ownerID, this.registerForm.value)
      .subscribe({
        next: () => {
          console.log("L'utilisateur a été mis à jour");
          this._router.navigate(['/list-owner']);
        },
        error: (error) => {
          console.error(
            "Une erreur s'est produite lors de la mise à jour de l'utilisateur:",
            error
          );
        },
        complete: () => {
          console.log("La mise à jour de l'utilisateur est terminée");
        },
      });
  }
}
