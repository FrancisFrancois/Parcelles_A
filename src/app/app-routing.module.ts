import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateAccountComponent } from './features/account-management/components/create-account/create-account.component';
import { ReadAccountComponent } from './features/account-management/components/read-account/read-account.component';
import { UpdateAccountComponent } from './features/account-management/components/update-account/update-account.component';
import { ListAccountComponent } from './features/account-management/components/list-account/list-account.component';

import { OwnerManagementComponent } from './features/owner-management/components/owner-management/owner-management.component';
import { ReadOwnerComponent } from './features/owner-management/components/read-owner/read-owner.component';
import { ListOwnerComponent } from './features/owner-management/components/list-owner/list-owner.component';
import { UpdateOwnerComponent } from './features/owner-management/components/update-owner/update-owner.component';
import { AppointmentComponent } from './features/appointment-management/component/appointment/appointment.component';

const routes: Routes = [
  { path : "create-account", component: CreateAccountComponent },
  { path : "list-account", component: ListAccountComponent },
  { path : "read-account", component: ReadAccountComponent },
  { path : "update-account", component: UpdateAccountComponent },
  { path : "owner-management", component: OwnerManagementComponent },
  { path : "read-owner", component: ReadOwnerComponent },
  { path : "list-owner", component: ListOwnerComponent },
  { path : "update-owner", component: UpdateOwnerComponent },
  { path : "appointment", component: AppointmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
