import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private _navbarService: NavbarService) {}

  onLinkClick(linkText: string): void {
    this._navbarService.updateNavbarText(linkText);
  }
}