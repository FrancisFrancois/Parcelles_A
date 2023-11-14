import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAccountComponent } from './read-account.component';

describe('ReadAccountComponent', () => {
  let component: ReadAccountComponent;
  let fixture: ComponentFixture<ReadAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadAccountComponent]
    });
    fixture = TestBed.createComponent(ReadAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
