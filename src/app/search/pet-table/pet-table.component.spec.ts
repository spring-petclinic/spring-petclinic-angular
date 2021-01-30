import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetTableComponent } from './pet-table.component';
import { Observable, of } from 'rxjs';
import { Pet } from 'app/pets/pet';
import { PetService } from 'app/pets/pet.service';
import { Router } from '@angular/router';
import { RouterStub } from 'app/testing/router-stubs';
import { RouterTestingModule } from '@angular/router/testing';

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
      imports: [RouterTestingModule],
      providers: [
        {provide: PetService, useClass: PetServiceStub},
        {provide: Router, useClass: RouterStub},
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
