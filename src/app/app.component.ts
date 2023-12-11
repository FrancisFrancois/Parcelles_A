import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Parcelles-Frontend';

  sidebarVisility : boolean = false;

  receiveVisibility(visiblity : boolean) : void{
    this.sidebarVisility = visiblity;
  }
}

