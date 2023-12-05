import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ReadAccount } from 'src/app/features/account-management/models/registerAccount';
import { AuthService } from 'src/app/features/auth/services/auth.service';

/**
 * Composant responsable de la navbar
 * 
 * Une des partie commune à l'ensemble des pages
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  /**
   * Information de l'éventuel utilisateur connecté
   * 
   * Est undefined si personne n'est connecté
   */
  private _connectedUser : ReadAccount | undefined;
  /**
   * Object stockant l'abonnement au changment de valeur de l'utilisateur connecté
   */
  private _userSub : Subscription = new Subscription();

  /**
   * Constructeur du composant
   * 
   * @param _authService Injection de dépendance du service responsable de l'authentification des utilisateurs
   */
  constructor(
    private _authService : AuthService
    ) {}

  /**
   * Méthode appelé au démarrage du composant (et par extension du site sur la session de l'utilisateur)
   * 
   * Abonne le _userSub pour obtenir les changments de valeur d'un utilisateur connecté
   * 
   * Vérification et processus temporaire de deconnexion en cas de refresh de la page
   */
  ngOnInit(): void {
    this._userSub = this._authService.$connectedUser.subscribe({
      next : (value) => {
        this._connectedUser = value;
        
        if(value == undefined && localStorage.getItem('parcelleToken')) {
          // option temporaire de déconnection en cas de refresh de la page et que le token est toujours présent
          // pourra être remplacé par un processus de reconnexion (nécessite un travail en Backend)
          this._authService.logout();
        }
      }
    })
  }

  /**
   * Fonction renvoyant une chaine de caractère à afficher
   * 
   * @returns quelque information a afficher
   */
  userDisplay() : string {
    return `${this._connectedUser?.roles} ${this._connectedUser?.firstName}`; 
  }
  /**
   * Fonction donnant l'information si un utilisateur est connecté
   * 
   * @returns true = utilisateur connecté | false = undefined
   */
  isConnected() : boolean {
    return this._connectedUser != undefined;
  }

  /**
   * Méthode de déconnexion appelant celle dans le service d'authentification
   */
  logout(): void {
    this._authService.logout();
  }

  /**
   * Méthode appelé à la destruction du composant
   * 
   * désabonne _usersub proprement
   */
  ngOnDestroy(): void {
    this._userSub.unsubscribe();
    this.logout();
  }
}