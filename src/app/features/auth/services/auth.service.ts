import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReadAccount, RegisterAccount } from '../../account-management/models/registerAccount';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth';
import { AccountManagementService } from 'src/app/shared/services/account-management.service';

/**
 * Service central dans l'authentification des utilisateurs
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * url à "contacter" en backend pour réaliser l'authentification
   */
  private _urlUser : string = this._urlBase+'/auth/login'

  /**
   * Information centralisée de l'utilisateur connecté
   */
  private _connectedUser : ReadAccount|undefined;
  /**
   * Getter pour obtenir l'information de l'utilisateur
   * 
   * @returns l'utilisateur connecté
   */
  private getUser(): ReadAccount|undefined{
    return this._connectedUser;
  }
  /**
   * Fonction indiquant si un utilisateur est connecté
   * 
   * @returns true si quelqu'un est connecté | false si undefined
   */
  isUserConnected() : boolean {
    if(this._connectedUser) return true;
    return false;
  }
  /**
   * Function renvoyant un boolean si le username donné correspont à celui de l'utilisateur connecté
   * 
   * renvoit false si aucun utilisateur connecté ou si le username donné est vide
   * 
   * @returns boolean confirmant ou non la correspondance
   */
  isUserLookForHimself(usernameReceived : string | undefined) : boolean{
    if(usernameReceived == undefined || this.getUser() == undefined) return false;
    return usernameReceived == this.getUser()!.username;
  }
  /**
   * boolean indiquant si l'utilisateur connecté à les droits secretaires
   * 
   * renvoit false si aucun utilisateur connecté
   * 
   * @returns vrai si l'utilisateur posséde le droit SECRETAIRE ou ADMIN
   */
  hasSecretaryRight() : boolean{
    if(this.getUser() == undefined) return false;
    if(!(this.getUser()?.roles.includes("SECRETAIRE") || this.getUser()?.roles.includes("ADMIN"))) return false;
    return true;
  }
  /**
   * BehaviorSubject permettant le contrôle sur la variable **connectedUser**
   * 
   * Peut déclencher l'envoi de nouvelle valeur pour cette varaible
   */
  private _$connectedUser : BehaviorSubject<ReadAccount | undefined> = new BehaviorSubject<ReadAccount|undefined>(this.getUser());
  /**
   * Observable sur lequel les composants et services s'abonnent pour obtenir les changements de valeurs de 
   * **connectedUser**
   */
  $connectedUser : Observable< ReadAccount | undefined> = this._$connectedUser.asObservable();
  
  /**
   *  BehaviorSubject contrôlant l'envoi d'un message d'erreur 
   */
  private _$errorConnection :BehaviorSubject<string|undefined> = new BehaviorSubject<string|undefined>(undefined);
  /**
   * Observable disposé pour les autres composants / services pour obtenir les éventuelles messages d'erreur lié à l'authneification
   */
  $errorConnection :Observable<string|undefined> = this._$errorConnection.asObservable();
  
  /**
   * Constructeur du service
   * 
   * @param _urlBase injection d'une constante contenant l'adresse du site et le port à contacter
   * @param _httpClient injection de dépendance d'un service utiliser pour créer les requête http
   * @param _accountManagmentService injection de dépendance du service de gestion des utilisateurs
   */
  constructor(@Inject('urlBackend') private _urlBase : string,
    private _httpClient: HttpClient,
    private _accountManagmentService :AccountManagementService) { }

  /**
   * Méthode pour s'authentifier
   * 
   * 1 S'assurer qu'un token ne gênera pas la requête
   * 
   * 2 envoi du formulaire d'authentification
   * 
   * 3 gestion de la réponse
   * 
   * Stockage le token obtenu dans le localstorage
   * 
   * @param authForm formulaire d'authnetification
   * @returns observable pouvant donner l'utilisateur authentifié
   */
  login(authForm : Auth) :Observable<ReadAccount | undefined>{
    if(localStorage.getItem('parcelleToken'))
    {
      localStorage.removeItem('parcelleToken');
    }

    this._httpClient.post<any>(this._urlUser, authForm).subscribe({
      next : (response) => {
        //preparation de l'objet user reçu
        let temp : ReadAccount = {
          id: response.id,
          username : response.login,
          firstName:'',
          lastName:'',
          email:'',
          phoneNumber: '',
          roles: [],
          blocked : false
        }

        //Token
        localStorage.setItem("parcelleToken", response.token.replace('Bearer ',''));

        this._accountManagmentService.getById(Number(temp.id)).subscribe({
          next : (response) => {
            //complétion de l'objet user
            temp = response;
            
            //Envoi du changement d'information
            this._$connectedUser.next(temp);
            this._connectedUser = temp;
            this._$errorConnection.next(undefined);
          }
        })
      },
      error : (error) => {
        switch(error.status){
          case (401):{
            this._$errorConnection.next("Le username ou le mot de passe est incorrect.");
            break;
          }
          default:{
            this._$errorConnection.next("Un problème de communication avec le serveur est survenu.\nRéessayez plus tard ou contactez un administrateur.");
            break;
          }
        }
      }
    })
    //Renvoit de l'observable
    return this.$connectedUser;
  }

  /**
   * Méthode de déconnection
   * 
   * vide aussi le localstorage
   */
  logout():void{
    //clean localstorage
    localStorage.removeItem('parcelleToken');

    //clean l'objet user connecté
    this._$connectedUser.next(undefined);

    this._connectedUser = undefined;
  }
}