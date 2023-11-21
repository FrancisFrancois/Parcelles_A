import { Component } from '@angular/core';
import { RegisterAccount } from '../../models/registerAccount';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountManagementService } from '../../../../shared/services/account-management.service';

@Component({
  selector: 'app-read-account',
  templateUrl: './read-account.component.html',
  styleUrls: ['./read-account.component.scss']
})
export class ReadAccountComponent {

  registerAccount : RegisterAccount | undefined;

  constructor(
    private _activeRoute : ActivatedRoute, 
    private _accountManagementService : AccountManagementService,
    private _router : Router,
    ) {
    let accoundId = +this._activeRoute.snapshot.params['id'];

    this._accountManagementService.getById(accoundId).subscribe({
      next: (res) => {
        this.registerAccount = res;
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

