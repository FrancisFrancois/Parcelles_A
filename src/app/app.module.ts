import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './features/auth/components/auth.component';
import { CreateAccountComponent } from './features/account-management/components/create-account/create-account.component';
import { ReadAccountComponent } from './features/account-management/components/read-account/read-account.component';
import { UpdateAccountComponent } from './features/account-management/components/update-account/update-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListAccountComponent } from './features/account-management/components/list-account/list-account.component';

import {  HttpClientModule } from '@angular/common/http';
import { ReadOwnerComponent } from './features/owner-management/components/read-owner/read-owner.component';
import { ListOwnerComponent } from './features/owner-management/components/list-owner/list-owner.component';
import { UpdateOwnerComponent } from './features/owner-management/components/update-owner/update-owner.component';
import { OwnerManagementComponent } from './features/owner-management/components/owner-management/owner-management.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentComponent } from './features/appointment-management/component/appointment/appointment.component';
import { CalendarComponent } from './features/appointment-management/component/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CreateAccountComponent,
    ReadAccountComponent,
    UpdateAccountComponent,
    ListAccountComponent,
    OwnerManagementComponent,
    ReadOwnerComponent,
    ListOwnerComponent,
    UpdateOwnerComponent,
    NavbarComponent,
    SidebarComponent,
    AppointmentComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
