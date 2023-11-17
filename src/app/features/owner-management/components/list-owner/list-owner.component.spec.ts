import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOwnerComponent } from './list-owner.component';

describe('ListOwnerComponent', () => {
  let component: ListOwnerComponent;
  let fixture: ComponentFixture<ListOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOwnerComponent]
    });
    fixture = TestBed.createComponent(ListOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
