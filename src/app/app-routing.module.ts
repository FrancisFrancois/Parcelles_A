import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerManagementComponent } from './features/owner-management/components/owner-management/owner-management.component';
import { ReadOwnerComponent } from './features/owner-management/components/read-owner/read-owner.component';
import { ListOwnerComponent } from './features/owner-management/components/list-owner/list-owner.component';
import { UpdateOwnerComponent } from './features/owner-management/components/update-owner/update-owner.component';

const routes: Routes = [
  { path: "owner-management", component: OwnerManagementComponent },
  { path: "read-owner", component: ReadOwnerComponent },
  { path: "list-owner", component: ListOwnerComponent },
  { path: "update-owner", component: UpdateOwnerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
