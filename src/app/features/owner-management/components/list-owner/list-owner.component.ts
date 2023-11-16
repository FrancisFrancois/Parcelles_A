import { Component, OnInit } from '@angular/core';
import { OwnerManagementService } from '../../services/owner-management.service';
import { Owner } from '../../Models/owner';
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
  
  {}
  ngOnInit() {
    this.AfficherOwners();
  }
  AfficherOwners() {
    this._ownerManagementService.getAll().subscribe({
      next: (res: Owner[]) => {
        this.owners = res;
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des propriétaires.', error);
        this._router.navigateByUrl('/notfound');
      }
    });
  }
}
