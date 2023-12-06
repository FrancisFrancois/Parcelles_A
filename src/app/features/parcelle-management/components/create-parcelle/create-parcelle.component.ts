import { Component } from '@angular/core';
import { OwnerManagementService } from 'src/app/features/owner-management/services/owner-management.service';
import { Owner } from 'src/app/features/owner-management/models/owner';

@Component({
  selector: 'app-create-parcelle',
  templateUrl: './create-parcelle.component.html',
  styleUrls: ['./create-parcelle.component.scss']
})
export class CreateParcelleComponent {

  //   owners: Owner[] = [];

  // constructor(  private _ownerManagementService: OwnerManagementService
  //   ) {}

  //   // j'ai repris la même fonction de Recherche du propriétaire que pour list-owner
  //   timeout :any;
  //   fname : string = "";
  //   lname : string = "";
  //   zip: string = "";
  //   email:string="";

  //   total = this.fname + this.lname + this.zip +this.email
  
  //   SearchOwner():void{
  //     clearTimeout(this.timeout);
  //     this.timeout = null;

  //     this.timeout = setTimeout(() => {
  //       this._ownerManagementService.searchOwners(this.total).subscribe({
  //         next: (response) => {
  //           console.log(this.fname, this.lname, this.zip,this.email);
  //           this.owners = response; // met à jour le tableau
  //         },
  //         error: (error) => {
  //           console.error(error, "pbm lors de la récupération des données");
  //         }
  //       });      
  //       clearTimeout(this.timeout);
  //       this.timeout = null;
  //     }, 1500);
  //   }












  // TEST DES INPUTS DYNAMIQUES DU OWNER
 

  // searchTermLname: string = '';
  // searchTermFname: string = '';
  // filteredOwnersLname: any[] = [];
  // filteredOwnersFname: any[] = [];
  constructor() { }

  ngOnInit() { }

  
  // owners = [
  //   { fname: 'alain', lname: 'leonard', zip: '12345', email: 'alain@example.com' },
  //   { fname: 'romain', lname: 'dupouy', zip: '67890', email: 'romain@example.com' },
  //   { fname: 'louis', lname: 'dupont', zip: '54321', email: 'louis@example.com' },
  // ];
  
  owners: any[] = [];
  timeout: any;
  fname: string = "";
  lname: string = "";
  zip: string = "";
  email: string = "";
  selectedOwner: any;
SearchOwner(): void {
  clearTimeout(this.timeout);
  this.timeout = null;

  const total = this.fname + this.lname + this.zip + this.email;

  this.timeout = setTimeout(() => {
    this.owners = [
      { fname: 'alain', lname: 'leonard', zip: '12345', email: 'alain@example.com' },
      { fname: 'romain', lname: 'dupouy', zip: '67890', email: 'romain@example.com' },
      { fname: 'louis', lname: 'dupont', zip: '54321', email: 'louis@example.com' },
    ];

    // Filtrer les propriétaires uniquement si lname n'est pas vide
    if (this.lname && total) {
      this.owners = this.owners.filter(owner =>
        owner.lname.toLowerCase().startsWith(this.lname.toLowerCase()) &&
        owner.fname.toLowerCase().includes(this.fname.toLowerCase()) &&
        owner.zip.includes(this.zip) &&
        owner.email.toLowerCase().includes(this.email.toLowerCase())
      );
    } else {
      this.owners = []; // Si lname est vide, pas de résultats
    }

    console.log(this.owners);

    clearTimeout(this.timeout);
    this.timeout = null;
  }, 500);
}

// ...

  selectOwner(owner: any): void {
    this.selectedOwner = owner;

    // Mettez à jour les autres champs avec les informations de l'objet sélectionné
    this.fname = owner.fname;
    this.lname = owner.lname;
    this.zip = owner.zip;
    this.email = owner.email;
  }
}
// ...

  
//   SearchOwnerLname() {
//     this.filteredOwnersLname = this.owners.filter(owner =>
//       owner.lname.toLowerCase().includes(this.searchTermLname.toLowerCase())
//     );
//     console.log(this.filteredOwnersLname);
//   }
  
//   SearchOwnerFname() {
//     this.filteredOwnersFname = this.owners.filter(owner =>
//       owner.fname.toLowerCase().includes(this.searchTermFname.toLowerCase())
//     );
//     console.log(this.filteredOwnersFname);
//   }
// }
