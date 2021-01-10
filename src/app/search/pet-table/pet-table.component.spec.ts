import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetTableComponent } from './pet-table.component';
import { Observable, of } from 'rxjs';
import { Pet } from 'app/pets/pet';
import { PetService } from 'app/pets/pet.service';

class PetServiceStub {
  getPetById(): Observable<Pet> {
    return of( { id: 1, name: 'Bello' } as Pet );
  }
}

describe('PetTableComponent', () => {
  let component: PetTableComponent;
  let fixture: ComponentFixture<PetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetTableComponent ],
      providers: [
        {provide: PetService, useClass: PetServiceStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
