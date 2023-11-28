import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CreateAccountComponent } from './features/account-management/components/create-account/create-account.component';
import { ReadAccountComponent } from './features/account-management/components/read-account/read-account.component';
import { UpdateAccountComponent } from './features/account-management/components/update-account/update-account.component';
import { ListAccountComponent } from './features/account-management/components/list-account/list-account.component';
import { ReadOwnerComponent } from './features/owner-management/components/read-owner/read-owner.component';
import { ListOwnerComponent } from './features/owner-management/components/list-owner/list-owner.component';
import { UpdateOwnerComponent } from './features/owner-management/components/update-owner/update-owner.component';
import { OwnerManagementComponent } from './features/owner-management/components/owner-management/owner-management.component';

import { AuthComponent } from './features/auth/components/auth.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { AuthTokenInterceptor } from './shared/interceptors/auth-token.interceptor';

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
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide : "urlBackend", useValue : "http://localhost:8081"},
    { provide : HTTP_INTERCEPTORS, useClass : AuthTokenInterceptor, multi : true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
