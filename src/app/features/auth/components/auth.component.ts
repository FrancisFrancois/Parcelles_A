import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReadAccount } from '../../account-management/models/registerAccount';

/**
 * Composant gérant la page de connexion
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  /**
   * Variable qui contient les éventuelles messages d'erreur
   * 
   * il est **undefined** lorsqu'il est vide
   */
  errorMessage :string|undefined;

  /**
   * Formulaire de login
   */
  loginForm : FormGroup;

  /**
   * "Abonnement" pour recevoir les messages reçus d'erreur lors d'une tentative de connexion
   */
  errorSub : Subscription = new Subscription();

  /**
   * constructeur du composant
   * 
   * @param _fb formbuilder créant une liaison avec le forumaire html
   * @param _authService injection de dépendance du service d'authentification
   * @param _router injection de dépendance du service permettant de les redirection
   */
  constructor(
    private _fb : FormBuilder,
    private _authService : AuthService,
    private _router : Router
    ) {

    this.loginForm = this._fb.group({
      login: [null, [Validators.required, Validators.maxLength(45)]],
      password: [null, [Validators.required, Validators.maxLength(150)]],
    });
  }

  /**
   * Méthode contactant le service d'authentification
   * 
   * Une redirection se fait si tout se passe bien
   */
  login() : void {
    if(this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe({
        next : (response) => {

          if(response != undefined){
            this.errorMessage = undefined;

            this._router.navigateByUrl('dashboard');
          }
        }
      })
    }
  }

  /**
   * Méthode qui abonne le composant au "fil" des messages d'erreur du service de connexion au démarrage du composant
   */
  ngOnInit(): void {
    this.errorSub = this._authService.$errorConnection.subscribe({
      next : (errormessage) => {
        this.errorMessage = errormessage;
      }
    })
  }

  /**
   * Méthode qui désabonne le composant au "fil" des messages d'erreur à la destruction du composant
   */
  ngDestroy(): void {
    this.errorSub.unsubscribe();
  }
}