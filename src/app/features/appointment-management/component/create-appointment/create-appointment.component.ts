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
 registerForm: FormGroup;

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
   this.registerForm = this._fb.group({
     lastName: [null, [Validators.required, Validators.maxLength(45), Validators.pattern(/^[\D]*$/)]],
     firstName: [null, [Validators.required, Validators.maxLength(45), Validators.pattern(/^[\D]*$/)]],
     roles : [null, [Validators.required, Validators.maxLength(45)]],
     password: [null, [Validators.required, Validators.maxLength(150), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
     passwordVerified: [null, [Validators.required]],
     email: [null, [Validators.required,Validators.maxLength(250), Validators.email]],
     phoneNumber: [null, [Validators.required,Validators.maxLength(45)]],
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

 /**
  * Méthode lançant la demande de création d'un nouvel utilisateur au service
  * 
  * Se fait uniquement si le formulaire est correctment rempli
  */
//  createUser() {
//    if (this.registerForm.valid) {  
//      this._appointmentService.create(this.registerForm.value).subscribe({
//        next: (response) => {
//          console.log("Utilisateur créé avec succès:", response);
//          this._router.navigateByUrl('/list-account');
//        },
//        error: (error) => {
//          console.error("Une erreur s'est produite lors de la création de l'utilisateur:", error);
//        },
//        complete: () => {
//          console.log("Création de l'utilisateur terminée.");
//        }
//      });
//      console.log(this.registerForm.value); 
//      console.log("FORMULAIRE VALIDE");
//    } else {
//      this.registerForm.markAllAsTouched();
//      console.log("FORMULAIRE INVALIDE");
//    }
//  }
}
