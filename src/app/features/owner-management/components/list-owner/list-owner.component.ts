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
  
  { }
  // afficher en priorité la liste de owners
  ngOnInit() {
    this.AfficherOwners();
  }
  //Afficher tous les owners
  AfficherOwners() {
    // On s'abonne à notre observable venant du service pour mettre owners dans table Owner puis les afficher
    this._ownerManagementService.getAll().subscribe({ 
      next: (res: Owner[]) => {
        this.owners = res;
      },
      //si erreur on redirige sur une autre page
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des propriétaires.', error);
        this._router.navigateByUrl('/notfound');
      }
    });
  }
}
