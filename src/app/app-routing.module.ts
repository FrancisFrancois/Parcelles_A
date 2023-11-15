import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerManagementComponent } from './features/owner-management/components/owner-management.component';

const routes: Routes = [
  {path: "owner-management", component: OwnerManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
