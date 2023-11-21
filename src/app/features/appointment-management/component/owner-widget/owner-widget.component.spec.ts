import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerWidgetComponent } from './owner-widget.component';

describe('OwnerWidgetComponent', () => {
  let component: OwnerWidgetComponent;
  let fixture: ComponentFixture<OwnerWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerWidgetComponent]
    });
    fixture = TestBed.createComponent(OwnerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
