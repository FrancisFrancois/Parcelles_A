import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParcelleComponent } from './create-parcelle.component';

describe('CreateParcelleComponent', () => {
  let component: CreateParcelleComponent;
  let fixture: ComponentFixture<CreateParcelleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateParcelleComponent]
    });
    fixture = TestBed.createComponent(CreateParcelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
