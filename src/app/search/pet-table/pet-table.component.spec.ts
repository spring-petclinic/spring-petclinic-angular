import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetTableComponent } from './pet-table.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Pet } from 'app/pets/pet';
import { PetService } from 'app/pets/pet.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchService } from '../search.service';

class SearchServiceStub {
  petsChecked = true;
  searchTerm = new BehaviorSubject<string>('max')
}

class PetServiceStub {
  getPetsBySearchTerm(searchTerm: string, noLimit:boolean): Observable<Pet[]> {
    return of([{
      id: 1,
      name: 'Max',
      birthDate: "01-01-01",
      owner: {
        id: 1,
        firstName: 'Hans',
        lastName: 'Wurst',
        address: 'HansWuerster-Alee 27',
        city: 'HansWurstHausen',
        telephone: '08007218281',
        pets: []
      },
      type: {
        id: 1,
        name: "cat",
      },
      visits: [],
    }] as Pet[]);
  }
}

describe('PetTableComponent', () => {
  let component: PetTableComponent;
  let fixture: ComponentFixture<PetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetTableComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {provide: PetService, useClass: PetServiceStub},
        {provide: SearchService, useClass: SearchServiceStub},
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

  it('should call petService and display pets', () => {
    let petServiceStub = fixture.debugElement.injector.get(PetService);
    component.updateTable('max');
    expect(component.pets[0].name).toEqual('Max');
    let petTablePetNameColumn = fixture.nativeElement.querySelector('.pet-name');
    expect(petTablePetNameColumn.innerText).toContain('Max');
  });
});
