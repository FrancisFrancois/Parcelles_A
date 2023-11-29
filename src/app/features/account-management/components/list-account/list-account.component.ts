import { Component } from '@angular/core';
import { ListAccount } from '../../models/registerAccount';
import { AccountManagementService } from '../../../../shared/services/account-management.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { searchAccount } from '../../Models/searchAccount';

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

  constructor(
    private _accountManagementService : AccountManagementService,
    private _router : Router,
    ) { 
  }

  ngOnInit(): void {
    this.isLoading = true;
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
