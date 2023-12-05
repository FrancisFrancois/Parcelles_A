import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Parcelles-Frontend';

  sidebarVisility : boolean = true;

  receiveVisibility(visiblity : boolean) : void{
    this.sidebarVisility = visiblity;
    console.log(visiblity, this.receiveVisibility);
  }
}

