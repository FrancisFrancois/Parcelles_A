import { Component } from '@angular/core';
import { ListAccount } from '../../models/registerAccount';
import { AccountManagementService } from '../../../../shared/services/account-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent {

  listAccount : ListAccount[] = [];

  constructor(
    private _accountManagementService : AccountManagementService,
    private _router : Router,
    ) { 
  }

  ngOnInit(): void {
    this._accountManagementService.getAll().subscribe({
      next: (response) => {
        this.listAccount = response;
        console.log("Recuperation de la liste des utilisateurs avec succes:", response);
      },
      error: (error) => {
        console.error("Une erreur s'est produite lors de la recuperation de la liste des utilisateurs:", error);
      },
      complete: () => {
        console.log("Recuperation de la liste des utilisateurs terminée.");
      }
    });
  }
  
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
}
