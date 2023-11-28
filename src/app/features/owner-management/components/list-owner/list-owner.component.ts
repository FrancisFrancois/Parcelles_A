import { Component, EventEmitter, OnInit } from '@angular/core';
import { OwnerManagementService } from '../../services/owner-management.service';
import { Owner } from '../../models/owner';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime, distinct, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-list-owner',
  templateUrl: './list-owner.component.html',
  styleUrls: ['./list-owner.component.scss']
})
export class ListOwnerComponent implements OnInit {

  owners: Owner[] = [];
  

  constructor(private _ownerManagementService: OwnerManagementService,
    private _router : Router)
  
  { }
  // afficher en priorité la liste de owners

  //voir si je peux supprimer :
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

  // Recherche du propriétaire
  timeout :any;
  fname : string = "";
  lname : string = "";
  zip : string = "";

  total = this.fname + this.lname + this.zip
  
  SearchOwner():void{
    clearTimeout(this.timeout);
    this.timeout = null;

    this.timeout = setTimeout(() => {
      this._ownerManagementService.searchOwners(this.total).subscribe({
        next: (response) => {
          console.log(this.fname, this.lname, this.zip);
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