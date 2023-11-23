import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventList } from '../../models/event-list';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  constructor(private _fb : FormBuilder){
    this.appointmentForm = this._fb.group({
      dateRange: [],
      startDate : [],
      endDate : [],
      owner : [],
      user : [],
      parcel: [],
    })
  }
  appointmentForm : FormGroup;
  showedEventList : EventList[] = [];
  hiddenEventList : EventList[] = [
    { 
      dateRange : [],
      startDate : new Date(2023,11,22),
      endDate : new Date(2023,11,22),
      owner : "Mime",
      user : "Jean-Luc",
      parcel : "1283"
    },
    { 
      dateRange : [],
      startDate : new Date(2023,12,6),
      endDate : new Date(2023,12,6),
      owner : "John",
      user : "Doe",
      parcel : "986547"
    },
  ];

  searchAppointment(){
    console.log(this.appointmentForm.value); 
    this.filterEvents();   
  }

  filterEvents() {
    const selectedStartDateObj = this.appointmentForm.get('startDate')?.value;
    const selectedEndDateObj = this.appointmentForm.get('endDate')?.value;

    console.log(selectedStartDateObj);
    console.log(selectedEndDateObj);
    
    const selectedStartDate = new Date(selectedStartDateObj.year, selectedStartDateObj.month, selectedStartDateObj.day);
    const selectedEndDate = new Date(selectedEndDateObj.year, selectedEndDateObj.month, selectedEndDateObj.day);

    console.log(selectedStartDate);
    console.log(selectedEndDate);
    
    this.showedEventList = this.hiddenEventList.filter(event => {
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(event.endDate);

      return eventStartDate >= selectedStartDate && eventEndDate <= selectedEndDate;
    });

    console.log(this.showedEventList);
  }




  onDateSelection(event: any){

  }





}
