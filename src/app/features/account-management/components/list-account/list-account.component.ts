import { Component } from '@angular/core';
import { ListAccount } from '../../models/registerAccount';
import { AccountManagementService } from '../../../../shared/services/account-management.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { searchAccount } from '../../Models/searchAccount';

/**
 * Composant responsable de l'affichage de la liste des utilisateurs
 */
@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent {

  /**
   * La liste des utilisateurs qui sont affichés
   */
  listAccount : ListAccount[] = [];
  
  /**
   * Objet de subscription qui permet de garder accessible les abonnements utiles pour la liste des utilisateurs
   * 
   * Permet aussi un désabonnement propre à la fin du composant
   */
  private _userListSubscribe : Subscription = new Subscription();

  /**
   * Boolean indiquant d'une requête est en cours mais n'a pas encore remis de réponse
   */
  isLoading : boolean = false;

  /**
   * Objet compteur permettant d'attendre une pause dans l'entrée fait par l'utilisateur final avant de lancé la requête
   * 
   * Permet de nettoyer correctement ce compteur
   */
  timeout : any;

  /**
   * champ du prénom pour affiner la liste à afficher
   */
  firstName :string = "";
  /**
   * champ du nom pour affiner la liste à afficher
   */
  lastName :string = "";
  /**
   * champ de l'email pour affiner la liste à afficher
   */
  email :string = "";
  /**
   * champ pour affiner la liste des utilisateurs actifs (ou pas) à afficher
   */
  blocked : boolean | null = null;

  /**
   * Constructeur du composant
   * 
   * @param _accountManagementService Injection de dépendance du service pour gèrer les utilisateur
   * @param _router Injection de dépendance du service permettant les redirections
   */
  constructor(
    private _accountManagementService : AccountManagementService,
    private _router : Router,
    ) { 
  }

  /**
   * Méthode se lançant à la création du composant
   * 
   * Cherche la liste compléte des utilisateurs
   */
  ngOnInit(): void {
    this.isLoading = true;
    this._userListSubscribe = this._accountManagementService.getAll().subscribe({
      next: (response) => {
        this.listAccount = response;
        console.log("Recuperation de la liste des utilisateurs avec succes:", response);
      },
      error: (error) => {
        console.error("Une erreur s'est produite lors de la recuperation de la liste des utilisateurs:", error);
      },
      complete: () => {
        this.isLoading = false;
        console.log("Recuperation de la liste des utilisateurs terminée.");
      }
    });
  }

  /**
   * Méthode de recherche pour affiner la liste des utilisateurs
   * 
   * 1 crée un objet qui met à null les champs vide
   * 
   * 2 lancement du compteur
   * 
   * si l'utilisateur entre de nouvelle information, ce compteur est reset et un nouvel objet (1) est créer
   * 
   * 3 A la fin du timer, la requête est demandée au service concerné avec l'objet qu'on a créé
   * 
   * 4 Reception de la réponse, changement de la liste des utilisateurs et nettoyage du compteur
   */
  SearchUser():void{

    let searchForm : searchAccount = {
      firstName : (this.firstName == "" || this.firstName.replaceAll(" ","") == "" ? null : this.firstName) ?? null,
      lastName : (this.lastName == "" || this.lastName.replaceAll(" ","") == "" ? null : this.lastName) ?? null,
      email : (this.email == "" || this.email.replaceAll(" ","") == "" ? null : this.email) ?? null,
      blocked : this.blocked ?? null 
    }

    clearTimeout(this.timeout);
    this.timeout = undefined;

    this.timeout = setTimeout(() => {

      this.isLoading = true;

      this._userListSubscribe = this._accountManagementService.searchUsers(searchForm).subscribe({
        next: (response) => {
          console.log(response);
          this.listAccount = response;
        },
        error: (error) => {
          console.error(error, "pbm lors de la récupération des données");
        },
        complete: () => {
          this.isLoading = false;
        }
      });

      clearTimeout(this.timeout);
      this.timeout = undefined;
    }, 1000);
  }
  /**
   * Méthode utlisé lors de la demande de supression d'un utilisateur
   * 
   * @param id l'identifiant de l'utilisateur
   */
  deleteUser(id : number) {
    this._accountManagementService.delete(id).subscribe({
      next: (response) => {
        console.log("Utilisateur supprimé avec succès:", response);
        this._router.navigateByUrl('/');
      },
      error: (error) => {
        console.error("Une erreur s'est produite lors de la suppression de l'utilisateur:", error);
      },
      complete: () => {
        console.log("Suppression de l'utilisateur terminée.");
      }
    });
  }

  /**
   * Méthode appelé à la destuction du composant pour "désabonner" l'objet correctement
   */
  ngOnDestroy() {
    this._userListSubscribe.unsubscribe();
   }
}
