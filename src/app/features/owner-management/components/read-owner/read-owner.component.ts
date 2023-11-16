import { Component } from '@angular/core';
import { Owner } from '../../Models/owner';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerManagementService } from '../../services/owner-management.service';

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
    let ownerId = +this._activeRoute.snapshot.params['id'];

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