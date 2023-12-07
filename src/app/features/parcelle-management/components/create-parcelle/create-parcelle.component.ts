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
  selectedOwner: any[] = [];
  totalselectedOwner:any[]=[];

  /**
   * fonction de recherche du owner
   */
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
          owner.fname.toLowerCase().startsWith(this.fname.toLowerCase()) &&
          owner.zip.startsWith(this.zip) &&
          owner.email.toLowerCase().startsWith(this.email.toLowerCase())
        );
      } else {
        this.owners = []; // Si lname est vide, pas de résultats
      }
      clearTimeout(this.timeout);
      this.timeout = null;
    }, 500);
  }

/** sélection du owner
 * @param owner 
 */
  selectOwner(owner: any): void {
    this.selectedOwner = owner;
    this.fname = owner.fname;
    this.lname = owner.lname;
    this.zip = owner.zip;
    this.email = owner.email;

    this.owners = []; // pour enlever les suggestions après avoir cliquer sur le owner choisi
    console.log(this.selectOwner)
      console.log(owner);
      ;
    
  }


  // Le selectOwner est ajouter lorqu'on appuie sur le bouton +
  addOwnerToParcel(): void {
    // vérification  si tous les champs sont remplis
    if (this.fname && this.lname && this.zip && this.email) {
      // ajout du owner dans la sélection
      this.totalselectedOwner.push(this.selectedOwner); // Push the selectOwner object directly into the owners array
   // push objet owner sélectionné dans le tableau Owners
      // Reset des inputs
      this.fname = "";
      this.lname = "";
      this.zip = "";
      this.email = "";
  
      console.log("Owners added to the parcel:", this.owners);
    } else {
      console.log("Please fill in all required fields.");
    }
  }
  
  

  // reste à faire :
  removeOwnerFromParcel(): void {
    console.log("Propriétaire supprimé de la parcelle");
  }
  

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
  }
