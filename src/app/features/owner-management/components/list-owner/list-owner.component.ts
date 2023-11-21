import { Component, OnInit } from '@angular/core';
import { OwnerManagementService } from '../../../../shared/services/owner-management.service';
import { Owner } from '../../models/owner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-owner',
  templateUrl: './list-owner.component.html',
  styleUrls: ['./list-owner.component.scss']
})
export class ListOwnerComponent implements OnInit {

  owners: Owner[]= [];

  constructor(private _ownerManagementService: OwnerManagementService,
    private _router : Router)
  
  { }
  // afficher en priorité la liste de owners
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
}
