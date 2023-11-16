import { Component } from '@angular/core';
import { RegisterAccount } from '../../models/registerAccount';
import { AccountManagementService } from '../../services/account-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent {

  registerAccountList : RegisterAccount[] = [];

  constructor(
    private _accountManagementService : AccountManagementService,
    private _router : Router) { 

    this._accountManagementService.getAll().subscribe({
      next: (res: RegisterAccount[]) => {
        this.registerAccountList = res;
      },
      error: (err) => {
        console.log(err);
        this._router.navigateByUrl('/notfound');
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
