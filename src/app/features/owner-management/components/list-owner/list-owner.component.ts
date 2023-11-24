import { Component, EventEmitter, OnInit } from '@angular/core';
import { OwnerManagementService } from '../../services/owner-management.service';
import { Owner } from '../../Models/owner';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime, distinct, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-list-owner',
  templateUrl: './list-owner.component.html',
  styleUrls: ['./list-owner.component.scss']
})
export class ListOwnerComponent implements OnInit {

  owners: Owner[] = [];
  

  constructor(private _ownerManagementService: OwnerManagementService,
    private _router : Router)
  
  { }
  // afficher en priorité la liste de owners

  //voir si je peux supprimer :
  // ngOnInit(): void {
  //   this._ownerManagementService.getAll().subscribe({
  //     next: (response) => {
  //       this.owners = response;
  //       console.log("Recuperation de la liste des propriétaires avec succès:", response);
  //     },
  //     error: (error) => {
  //       console.error("Une erreur s'est produite lors de la recuperation de la liste des utilisateurs:", error);
  //     },
  //     complete: () => {
  //       console.log("Recuperation de la liste des utilisateurs terminée.");
  //     }
  //   });
  // }
  deleteOwner(id : number) {
    this._ownerManagementService.delete(id).subscribe({
      next: (response) => {
        console.log("Propriétaire supprimé avec succès:", response);
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

// Recherche du propriétaire
  // Gérer les inputs null, sont acceptés
  
  // 1) Gérer le input
  InitialValue: string = '';
  DebounceTime = 300
  TextChange = new EventEmitter<string>();

  InputValue = new Subject<string>();
  trigger = this.InputValue.pipe( // erreur du pipe de l'exemple : il fallait changer le intialValue par InputValue parce que faut le faire sur l'Obs 
    debounceTime(this.DebounceTime),
    distinctUntilChanged()
  );
  
  subscriptions: Subscription[] = [];

  ngOnInit() {
    const subscription = this.trigger.subscribe((currentValue) => {
      // Émission de la valeur courante vers l'événement 'TextChange'
      this.TextChange.emit(currentValue);
    });
    // Ajout de l'abonnement au tableau subscriptions
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    // Désabonnement de toutes les souscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // La fonction onInput est appelée à chaque fois qu'un utilisateur tape quelque chose
  onInput(e: any) {
  // On prend la valeur saisie par l'utilisateur et la transmet au sujet 'InputValue'.
    this.InputValue.next(e.target.value);
  }


  // 2) Contacter API
  
  // onTextChange(changedText: string) {
  //   this.cancelPendingRequests();
  //   const OwnerSubscription = this._ownerManagementService
  //     .searchOwners(changedText) //! Demande 3 arguments automatiquement
  //     .subscribe(
  //       response => {
  //         this.results = response;
  //       },
  //       errorResponse => {
  //         alert("oh no, there was an error when calling the star wars api");
  //         console.error(errorResponse);
  //       }
  //     );
  //   this.subscriptions.push(OwnerSubscription);
  // }
  // cancelPendingRequests() {
  //   this.subscriptions.forEach(sub => sub.unsubscribe());
  // }
}