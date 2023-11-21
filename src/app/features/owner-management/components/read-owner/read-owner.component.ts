import { Component } from '@angular/core';
import { Owner } from '../../models/owner';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerManagementService } from '../../../../shared/services/owner-management.service';

@Component({
  selector: 'app-read-owner',
  templateUrl: './read-owner.component.html',
  styleUrls: ['./read-owner.component.scss']
})
export class ReadOwnerComponent {

  owner: Owner | undefined;

  constructor(
    private _activeRoute : ActivatedRoute, 
    private _OwnerManagementService : OwnerManagementService,
    private _router : Router
  ) {
    // Récupère l'identifiant de la route active
    let ownerId = +this._activeRoute.snapshot.params['id'];
    
    // On récupère l'ID du owner pour l'afficher
    this._OwnerManagementService.getById(ownerId).subscribe({
      next: (res) => {
        this.owner = res;
      },
      error: (err) => {
        console.log(err);
        this._router.navigateByUrl('/notfound');
      }
    });
  }
}