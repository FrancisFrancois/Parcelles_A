import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountWidgetComponent } from './account-widget.component';

describe('AccountWidgetComponent', () => {
  let component: AccountWidgetComponent;
  let fixture: ComponentFixture<AccountWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountWidgetComponent]
    });
    fixture = TestBed.createComponent(AccountWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
