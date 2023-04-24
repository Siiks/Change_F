import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPeticionComponent } from './edit-peticion.component';

describe('EditPeticionComponent', () => {
  let component: EditPeticionComponent;
  let fixture: ComponentFixture<EditPeticionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPeticionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
