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
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { AuthComponent } from './features/auth/components/auth.component';
import { accessSimpleGuard, accessSecretaryGuard } from './access.guard';
import { ResetAccountComponent } from './features/account-management/components/reset-account/reset-account.component';
import { DashboardMainComponent } from './features/dashboard/components/dashboard-main/dashboard-main.component';

const routes: Routes = [
  { path : "create-account", component : CreateAccountComponent, canActivate : [accessSecretaryGuard] },
  { path : "list-account", component : ListAccountComponent, canActivate : [accessSecretaryGuard] },
  { path : "read-account/:id", component : ReadAccountComponent, canActivate : [accessSimpleGuard] },
  { path : "update-account/:id", component : UpdateAccountComponent, canActivate : [accessSimpleGuard] },
  { path : "owner-management", component : OwnerManagementComponent, canActivate : [accessSecretaryGuard] },
  { path : "read-owner/:id", component : ReadOwnerComponent, canActivate : [accessSecretaryGuard] },
  { path : "list-owner", component : ListOwnerComponent, canActivate : [accessSecretaryGuard] },
  { path : "update-owner/:id", component : UpdateOwnerComponent, canActivate : [accessSecretaryGuard] },
  { path : "not-found", component : NotfoundComponent },
  { path : "auth", component : AuthComponent},
  { path : "dashboard", component : DashboardMainComponent, canActivate : [accessSimpleGuard]},
  { path : "reset-account", component : ResetAccountComponent},
  { path : "", redirectTo : '/auth', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
