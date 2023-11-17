import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOwnerComponent } from './read-owner.component';

describe('ReadOwnerComponent', () => {
  let component: ReadOwnerComponent;
  let fixture: ComponentFixture<ReadOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadOwnerComponent]
    });
    fixture = TestBed.createComponent(ReadOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
