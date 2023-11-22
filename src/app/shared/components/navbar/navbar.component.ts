import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  navbarText$: Observable<string> = new Observable<string>();

  constructor(private _navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarText$ = this._navbarService.navbarText$;
  }
  onLinkClick(linkText: string): void {
    this._navbarService.updateNavbarText(linkText);
  }
}