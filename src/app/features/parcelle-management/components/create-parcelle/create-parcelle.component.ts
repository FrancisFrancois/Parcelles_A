import { Component } from '@angular/core';
import { OwnerManagementService } from 'src/app/features/owner-management/services/owner-management.service';
import { Owner } from 'src/app/features/owner-management/models/owner';

@Component({
  selector: 'app-create-parcelle',
  templateUrl: './create-parcelle.component.html',
  styleUrls: ['./create-parcelle.component.scss']
})
export class CreateParcelleComponent {

  owners: Owner[] = [];

constructor(  private _ownerManagementService: OwnerManagementService
  ) {}

  // j'ai repris la même fonction de Recherche du propriétaire que pour list-owner
  timeout :any;
  fname : string = "";
  lname : string = "";
  zip: string = "";
  email:string="";

  total = this.fname + this.lname + this.zip +this.email
  
  SearchOwner():void{
    clearTimeout(this.timeout);
    this.timeout = null;

    this.timeout = setTimeout(() => {
      this._ownerManagementService.searchOwners(this.total).subscribe({
        next: (response) => {
          console.log(this.fname, this.lname, this.zip,this.email);
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



