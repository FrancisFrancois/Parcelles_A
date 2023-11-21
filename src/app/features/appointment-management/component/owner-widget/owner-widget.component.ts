import { Component } from '@angular/core';
import { OwnerWidget } from '../../models/owner-widget';

@Component({
  selector: 'app-owner-widget',
  templateUrl: './owner-widget.component.html',
  styleUrls: ['./owner-widget.component.scss']
})
export class OwnerWidgetComponent {
  registerAccountList : OwnerWidget[] = [];
}
  

