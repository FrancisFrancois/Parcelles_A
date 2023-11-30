import { Component, OnInit } from '@angular/core';
import { EventList } from '../../models/event-list';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from '../../services/appointment.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  constructor(
  /**
   * @param calendar Instancie le calendrier pour le datepicker
   * @param _appointmentService Instancie le service pour les requêtes HTTP
  */
    calendar: NgbCalendar, 
    private _appointmentService: AppointmentService){       
    /** 
     * Permet de selectionner 10 jours automatiquement lors du chargement de la page en appelant le getByDate du appointmentService
     * @param fromDate Selectionne la date du jour lors du chargement de la page dans la variable this.fromDate
     * @param toDate Selectionne la date du jour + 10 jours lors du chargement de la page dans la variable this.toDate
     * @param fromDateString Converti la date de this.fromDate en string pour l'envoyer dans l'url de la requête du getByDate(string,string) du appointmentService
     * @param toDateString Converti la date de this.toDate en string pour l'envoyer dans l'url de la requête du getByDate(string,string) du appointmentService
     * Appelle filterEvents() pour initialiser la liste des événements à l'ouverture du composant avec une plage de dates par défaut.
    */
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(this.fromDate, 'd', 10);
    this.filterEvents()
  }

  /**
   * @param eventListSubsciption Subscription pour la requête HTTP (https://rxjs.dev/guide/subscription)
   * @param showedEventList Liste des événements rempli par la requete http
   * @param dateRange Tableau de selection de la date par le Ngbdatepicker
   * 
   * 
   * 
  */
  eventListSubsciption?: Subscription = new Subscription();
  showedEventList?: EventList[];
  dateRange?: [];
  owner?: string;
  user?: string;
  parcel?: string; 

  /**
 * Gère la sélection d'une date dans le datepicker.
 * Met à jour `fromDate` et `toDate` en fonction de la date sélectionnée.
 * Déclenche `filterEvents` pour filtrer les événements après la sélection.
 *
 * @param {NgbDate} date - La date sélectionnée dans le datepicker.
 */
  onDateSelection(date: NgbDate) {    
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.filterEvents()    
  }

  /**
 * Appelée par onDateSelection lorsque la plage de dates est modifiée via le datepicker.
 * Filtre les événements basés sur les dates sélectionnées en envoyant une requête au service AppointmentService.
 * Ne procède au filtrage que si les propriétés `fromDate` et `toDate` sont définies.
 * Utilise les méthodes `getByDate` du service AppointmentService pour récupérer les événements correspondant aux critères de date.
 * Met à jour la liste `showedEventList` avec les événements récupérés.
 * Gère les cas de succès, d'erreur, et de complétion de la requête.
 */
  filterEvents() {
    if (!this.fromDate || !this.toDate) {
      return;
    }
    
    const selectedStartDate = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day).toString();
    const selectedEndDate = new Date(this.toDate.year, this.toDate.month-1, this.toDate.day).toString();
    console.log(selectedEndDate, selectedStartDate);
    
    this.eventListSubsciption = this._appointmentService.getByDate(selectedStartDate, selectedEndDate).subscribe({
      next: (res) => {
        this.showedEventList = res;
        console.log("Recuperation de la liste des évènements avec succes:", res);
      },
      error: (error) => {
        console.error("Une erreur s'est produite lors de la recuperation de la liste des évènements:", error);
      },
      complete: () => {
        console.log("Recuperation de la liste des évènements terminée.");    
      }  
    })
  }
  
  //!!!!!!!!!!!! DateRangePicker:
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;


  /**
   * Détermine si une date est survolée dans le datepicker.
   * Renvoie `true` si la date est entre `fromDate` et `hoveredDate`.
   *
   * @param {NgbDate} date - La date à vérifier.
   * @returns {boolean} - `true` si la date est survolée, sinon `false`.
   */
  isHovered(date: NgbDate) {
    return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
  }
  
  /**
   * Vérifie si une date est à l'intérieur de la plage sélectionnée.
   * Renvoie `true` si la date est entre `fromDate` et `toDate`.
   *
   * @param {NgbDate} date - La date à vérifier.
   * @returns {boolean} - `true` si la date est à l'intérieur de la plage, sinon `false`.
   */
  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  /**
   * Détermine si une date fait partie de la plage de dates sélectionnée.
   * Renvoie `true` si la date est égale à `fromDate` ou `toDate`, ou si elle est à l'intérieur de cette plage.
   *
   * @param {NgbDate} date - La date à évaluer.
   * @returns {boolean} - `true` si la date fait partie de la plage, sinon `false`.
   */
  isRange(date: NgbDate) {
    return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

  /**
   * Convertit un objet `NgbDate` du datepicker en objet `Date` JavaScript standard.
   * Utilisé pour convertir les dates sélectionnées dans le datepicker en dates utilisables dans le code.
   * Utilisé actuellement pour affiché les dates sélectionnées en haut a gauche du composant (au desssus du calendrier)
   * @param {NgbDate} ngbDate - L'objet `NgbDate` à convertir.
   * @returns {Date} - L'objet `Date` JavaScript correspondant.
  */
  convertNgbDateToDate(ngbDate: NgbDate): Date {
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  

  // Fonction de recherche automatique (a mettre dans un service? Ca fait beaucoup la nn?)

  // Recherche du propriétaire
  // SearchUser():void{

  //   let searchForm : searchAccount = {
  //     firstName : (this.firstName == "" || this.firstName.replaceAll(" ","") == "" ? null : this.firstName) ?? null,
  //     lastName : (this.lastName == "" || this.lastName.replaceAll(" ","") == "" ? null : this.lastName) ?? null,
  //     email : (this.email == "" || this.email.replaceAll(" ","") == "" ? null : this.email) ?? null,
  //     blocked : this.blocked ?? null 
  //   }

  //   clearTimeout(this.timeout);
  //   this.timeout = undefined;

  //   this.timeout = setTimeout(() => {

  //     this.isLoading = true;

  //     this._userListSubscribe = this._accountManagementService.searchUsers(searchForm).subscribe({
  //       next: (response) => {
  //         console.log(response);
  //         this.listAccount = response;
  //       },
  //       error: (error) => {
  //         console.error(error, "pbm lors de la récupération des données");
  //       },
  //       complete: () => {
  //         this.isLoading = false;
  //       }
  //     });

  //     clearTimeout(this.timeout);
  //     this.timeout = undefined;
  //   }, 1000);
  // }
  // ngOnDestroy() {
  //   this._userListSubscribe.unsubscribe();
  //  }
}






