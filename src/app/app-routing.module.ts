import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './features/account-management/components/create-account/create-account.component';
import { ReadAccountComponent } from './features/account-management/components/read-account/read-account.component';
import { UpdateAccountComponent } from './features/account-management/components/update-account/update-account.component';
import { ListAccountComponent } from './features/account-management/components/list-account/list-account.component';

const routes: Routes = [
  { path : "create-account", component: CreateAccountComponent },
  { path : "list-account", component: ListAccountComponent },
  { path : "read-account", component: ReadAccountComponent },
  { path : "update-account", component: UpdateAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
