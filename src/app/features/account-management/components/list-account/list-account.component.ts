import { Component } from '@angular/core';
import { ListAccount } from '../../models/registerAccount';
import { AccountManagementService } from '../../../../shared/services/account-management.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { searchAccount } from '../../models/searchAccount';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent {

  listAccount : ListAccount[] = [];
  private _userListSubscribe : Subscription = new Subscription();

  isLoading : boolean = false;
  timeout : any;
  firstName :string = "";
  lastName :string = "";
  email :string = "";
  blocked : boolean | null = null;

  
  simulatedUser1: ListAccount = {
    id: 1,
    username: 'john_doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    roles: ['user'],
    phoneNumber: '1234567890',
    blocked: false
  };
  
  simulatedUser2: ListAccount = {
    id: 2,
    username: 'jane_smith',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    roles: ['admin'],
    phoneNumber: '9876543210',
    blocked: false
  };
  
  simulatedUsers: ListAccount[] = [this.simulatedUser1, this.simulatedUser2];
  constructor(
    private _accountManagementService : AccountManagementService,
    private _router : Router,
    ) { 
  }

  ngOnInit(): void {
   // this.isLoading = true;
    this.listAccount = this.simulatedUsers;
    this._userListSubscribe = this._accountManagementService.getAll().subscribe({
      next: (response) => {
        this.listAccount = response;
        console.log("Recuperation de la liste des utilisateurs avec succes:", response);
      },
      error: (error) => {
        console.error("Une erreur s'est produite lors de la recuperation de la liste des utilisateurs:", error);
      },
      complete: () => {
        this.isLoading = false;
        console.log("Recuperation de la liste des utilisateurs terminée.");
      }
    });
  }

  SearchUser():void{

    let searchForm : searchAccount = {
      firstName : (this.firstName == "" || this.firstName.replaceAll(" ","") == "" ? null : this.firstName) ?? null,
      lastName : (this.lastName == "" || this.lastName.replaceAll(" ","") == "" ? null : this.lastName) ?? null,
      email : (this.email == "" || this.email.replaceAll(" ","") == "" ? null : this.email) ?? null,
      blocked : this.blocked ?? null 
    }

    clearTimeout(this.timeout);
    this.timeout = undefined;

    this.timeout = setTimeout(() => {

      this.isLoading = true;

      this._userListSubscribe = this._accountManagementService.searchUsers(searchForm).subscribe({
        next: (response) => {
          console.log(response);
          this.listAccount = response;
        },
        error: (error) => {
          console.error(error, "pbm lors de la récupération des données");
        },
        complete: () => {
          this.isLoading = false;
        }
      });

      clearTimeout(this.timeout);
      this.timeout = undefined;
    }, 1000);
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

  ngOnDestroy() {
    this._userListSubscribe.unsubscribe();
   }
}
