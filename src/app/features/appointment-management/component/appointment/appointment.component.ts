import { Component } from '@angular/core';
import { EventList } from '../../models/event-list';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from '../../services/appointment.service';


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
    private _appointmentService: AppointmentService
    ) {      
    /** 
     * @param fromDate Première date selectionnée par le Ngbdatepicker
     * @param toDate Seconde date selectionnée par le Ngbdatepicker
    */
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(this.fromDate, 'd', 10);  
  }

  /**
   * @param dateRange Tableau de selection de la date par le Ngbdatepicker
   * 
   * 
   * !!FAIRE UN OBJET POUR LE RESTE!!
  */

  eventList: EventList[] = [];
  

  dateRange?: [];
  owner?: string;
  user?: string;
  parcel?: string;


  

  /**
   * Listes temporaires pour les événements affichés et cachés
  */
  showedEventList: EventList[] = [];
  hiddenEventList: EventList[] = [
    {
      dateRange: {
        fromDate: new Date(2023, 10, 22), // Attention en JS les mois commencent à 0 donc 10 est le mois de novembre
        toDate: new Date(2023, 10, 22)
      },
      owner: "Mime",
      user: "Jean-Luc",
      parcel: "1283"
    },
    {
      dateRange: {
        fromDate: new Date(2023, 11, 6),
        toDate: new Date(2023, 11, 6)
      },
      owner: "John",
      user: "Doe",
      parcel: "986547"
    }
  ];

  // A supprimer?
  searchAppointment(){
    this.filterEvents();   
  }

  /**
 * Filtre les événements en fonction des dates sélectionnées.
 * Utilise les propriétés `fromDate` et `toDate` pour filtrer `hiddenEventList`.
 * Met à jour `showedEventList` avec les événements filtrés.
 * Ne procède au filtrage que si `fromDate` et `toDate` sont définies.
 */
  filterEvents() {
    if (!this.fromDate || !this.toDate) {
      return;
    }
    
    const selectedStartDate = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day);
    const selectedEndDate = new Date(this.toDate.year, this.toDate.month-1, this.toDate.day);
  
    this.showedEventList = this.hiddenEventList.filter(event => {
      const eventStartDate = event.dateRange.fromDate;
      const eventEndDate = event.dateRange.toDate;
  
      return eventStartDate >= selectedStartDate && eventEndDate <= selectedEndDate;
    });
  }
  


  //!!!!!!!!!!!! DateRangePicker:
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;

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

  // Conversion de la date affichée au dessus du calendrier de sélection de dates
  /**
 * Convertit un objet `NgbDate` en objet `Date` JavaScript standard.
 * Utile pour convertir les dates sélectionnées dans le datepicker en dates utilisables dans le code.
 *
 * @param {NgbDate} ngbDate - L'objet `NgbDate` à convertir.
 * @returns {Date} - L'objet `Date` JavaScript correspondant.
 */
  convertNgbDateToDate(ngbDate: NgbDate): Date {
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  // Fonction de recherche automatique (a mettre dans un service? Ca fait beaucoup la nn?)
  // Recherche du propriétaire
  timeout :any;

  
  // CODE A COMPLETER POUR LA RECHERHE AUTOMATIQUE
    // CODE A COMPLETER POUR LA RECHERHE AUTOMATIQUE
      // CODE A COMPLETER POUR LA RECHERHE AUTOMATIQUE
        // CODE A COMPLETER POUR LA RECHERHE AUTOMATIQUE

  // total = this.owner + this.user + this.parcel
  
  // SearchOwner():void{
  //   clearTimeout(this.timeout);
  //   this.timeout = null;

  //   this.timeout = setTimeout(() => {
  //     this._appointmentService.searchOwners(this.total).subscribe({
  //       next: (response) => {
  //         console.log(this.fname, this.lname, this.zip);
  //         this.owners = response; // met à jour le tableau
  //       },
  //       error: (error) => {
  //         console.error(error, "pbm lors de la récupération des données");
  //       }
  //     });      
  //     clearTimeout(this.timeout);
  //     this.timeout = null;
  //   }, 1500);
  // }

}






