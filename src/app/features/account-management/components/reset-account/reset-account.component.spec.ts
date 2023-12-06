import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetAccountComponent } from './reset-account.component';

describe('ResetAccountComponent', () => {
  let component: ResetAccountComponent;
  let fixture: ComponentFixture<ResetAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetAccountComponent]
    });
    fixture = TestBed.createComponent(ResetAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
