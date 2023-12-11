import { Component } from '@angular/core';
import { OwnerGet } from '../../models/owner';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerManagementService } from '../../services/owner-management.service';

@Component({
  selector: 'app-read-owner',
  templateUrl: './read-owner.component.html',
  styleUrls: ['./read-owner.component.scss'],
})
export class ReadOwnerComponent {
  /**
   * On récupère l'owner à afficher, il peut être undefined si l'owner n'existe pas
   */
  owner: OwnerGet | undefined;

  /**
   * @param _activeRoute permet de récupérer l'ID de l'owner à afficher à l'aide de l'url
   * @param _ownerManagementService on appelle le service contenant la requête create Owner
   * @param _router  afin de se rendre à la page notfound si l'owner n'existe pas
   */
  constructor(
    private _activeRoute: ActivatedRoute,
    private _OwnerManagementService: OwnerManagementService,
    private _router: Router
  ) {
    /*On récupère l'ID de l'owner à afficher à l'aide de l'url*/
    let ownerId = +this._activeRoute.snapshot.params['id'];

    /* on appelle le service pour récupérer l'owner correspondant et on le stocke dans la propriété owner*/
    this._OwnerManagementService.getById(ownerId).subscribe({
      next: (res) => {
        this.owner = res;
      },
      error: (err) => {
        console.log(err);
        this._router.navigateByUrl('/notfound');
      },
    });
  }
}