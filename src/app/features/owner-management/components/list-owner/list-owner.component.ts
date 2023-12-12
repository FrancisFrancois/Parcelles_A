import { Component, OnInit } from '@angular/core';
import { OwnerManagementService } from '../../services/owner-management.service';
import { OwnerGet } from '../../models/owner';
import { Router } from '@angular/router';
import { searchOwner } from '../../Models/searchOwner';

@Component({
  selector: 'app-list-owner',
  templateUrl: './list-owner.component.html',
  styleUrls: ['./list-owner.component.scss']
})
export class ListOwnerComponent implements OnInit {

  /** tableau des propriétaires basé sur le modèle Owner */
  owners: OwnerGet[] = [];
  
/**
 * @param _ownerManagementService on appelle le service contenant la requête search Owner
 * @param _router  afin de se rendre à une autre page après le deleteId, reste à déterminer vers quelle page
 */
  constructor(private _ownerManagementService: OwnerManagementService,
    private _router : Router)
  { }

  /** On affiche dès le début la liste totale de owners
  */
  ngOnInit(): void {
    this._ownerManagementService.getAll().subscribe({
      next: (response) => {
        this.owners = response;
        console.log("Recuperation de la liste des propriétaires avec succès:", response);
      },
      error: (error) => {
        console.error("Une erreur s'est produite lors de la recuperation de la liste des utilisateurs:", error);
      },
      complete: () => {
        console.log("Recuperation de la liste des utilisateurs terminée.");
      }
    });
  }
  deleteOwner(id : number) {
    this._ownerManagementService.delete(id).subscribe({
      next: (response) => {
        console.log("Propriétaire supprimé avec succès:", response);
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
  Fonction de recherche dynamique du propriétaire via les input nom/prenom/zip toutes les 1.5s après touche relâchée.
  Le tableau doit évoluer dynamiquement.
  */
  timeout :any;
  fname : string = "";
  lname : string = "";
  zip : string = "";
  city: string = "";
  email:string="";
  SearchOwner():void{
    let searchForm : searchOwner = {
      fname : (this.fname == "" || this.fname.replaceAll(" ","") == "" ? null : this.fname) ?? null,
      lname : (this.lname == "" || this.lname.replaceAll(" ","") == "" ? null : this.lname) ?? null,
      zip : (this.zip == "" || this.zip.replaceAll(" ","") == "" ? null : this.zip) ?? null,
      city : (this.city == "" || this.city.replaceAll(" ","") == "" ? null : this.city) ?? null,
      email : (this.email == "" || this.email.replaceAll(" ","") == "" ? null : this.email) ?? null
    }

    clearTimeout(this.timeout);
    this.timeout = null;

    this.timeout = setTimeout(() => {
      this._ownerManagementService.searchOwners(searchForm).subscribe({
        next: (response) => {
          console.log(this.fname,this.lname, this.city,this.email);
          this.owners = response; // met à jour le tableau
        },
        error: (error) => {
          console.error(error, "pbm lors de la récupération des données");
        }
      });      
      clearTimeout(this.timeout);
      this.timeout = null;
    }, 1500);
  }
}