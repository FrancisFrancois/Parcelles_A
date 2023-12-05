import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent {




 /**
   * "formulaire" pour la création de l'utilisateur
   */
 createAppointmentForm: FormGroup;

 /**
  * Constructeur du composant
  * 
  * C'est ici qu'est créé le formulaire avec tous ses champs et les validators associés
  * 
  * @param _fb Classe abstraite permeattant la 
  * @param _accountManagementService injection de dépendant au service responsable de la gestion des utilisateurs
  * @param _router injection de dépendance au service permettant les redirections
  */
 constructor(
   private _fb : FormBuilder,
   private _appointmentService: AppointmentService,
   private _router: Router
   ) {
   this.createAppointmentForm = this._fb.group({
     date_visite: [null, [Validators.required]],
     heure_visite: [null, [Validators.required]],
     locality : [null, Validators.maxLength(150)],
     meeting_place: [null, [Validators.required, Validators.maxLength(150)]],
     person: [null, [Validators.required, Validators.maxLength(50)]],
     isOwner: [null],
     phone: [null],
     user: [null, [Validators.required,Validators.maxLength(50), Validators.email]],
     parcel: [null, [Validators.required,Validators.maxLength(45)]],
     massif_visit: [null],
     massif_name: [null, [Validators.required,Validators.maxLength(45)]],
   });
 }
 /**
  * Méthode lançant la demande de création d'un nouvel évènement au service
  * Se fait uniquement si le formulaire est correctment rempli
  */
 createAppointment() {
   if (this.createAppointmentForm.valid) {  
     this._appointmentService.createEvents(this.createAppointmentForm.value).subscribe({
       next: (response) => {
         console.log("Evenement créé avec succès:", response);
         this._router.navigateByUrl('/visite/create');
       },
       error: (error) => {
         console.error("Une erreur s'est produite lors de la création de l'évènement:", error);
       },
       complete: () => {
         console.log("Création de l'évènement terminée.");
       }
     });
     console.log(this.createAppointmentForm.value); 
     console.log("FORMULAIRE VALIDE");
   } else {
     this.createAppointmentForm.markAllAsTouched();
     console.log("FORMULAIRE INVALIDE");
   }
 }
}
