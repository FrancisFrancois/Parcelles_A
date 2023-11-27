import { Component } from '@angular/core';
import { EventList } from '../../models/event-list';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  constructor(calendar: NgbCalendar){
    // dateRange picker
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(this.fromDate, 'd', 10);
  }
  //Propriétés de recherche
  dateRange?: [];
  owner?: [];
  user?: [];
  parcel?: [];

  showedEventList : EventList[] = [];
  hiddenEventList: EventList[] = [
    {
      dateRange: {
        fromDate: new Date(2023, 11, 22),
        toDate: new Date(2023, 11, 22)
      },
      owner: "Mime",
      user: "Jean-Luc",
      parcel: "1283"
    },
    {
      dateRange: {
        fromDate: new Date(2023, 12, 6),
        toDate: new Date(2023, 12, 6)
      },
      owner: "John",
      user: "Doe",
      parcel: "986547"
    }
  ];

  searchAppointment(){
    this.filterEvents();   
  }

  filterEvents() {
    if (!this.fromDate || !this.toDate) {
      return;
    }
  
    const selectedStartDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    const selectedEndDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
  
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
    console.log(this.fromDate);
    console.log(this.toDate);
    
  }

  isHovered(date: NgbDate) {
    return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
}






