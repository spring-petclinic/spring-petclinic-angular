import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitTableComponent } from './visit-table.component';
import { VisitService } from 'app/visits/visit.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Visit } from 'app/visits/visit';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchService } from '../search.service';


class VisitServiceStub {
  getVisitsBySearchTerm(searchTerm: string, noLimit:boolean): Observable<Visit[]> {
    return of([{
      id: 1,
      date: "01-01-01",
      description: "rabies shot",
      pet: {
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
      },
      vet: 1,
      vetFirstName: "Rick",
      vetLastName: "Astley",
      vetName: "Rick Astley",
    }] as Visit[]);
  }
}

class SearchServiceStub {
  visitsChecked = true;
  searchTerm = new BehaviorSubject<string>('hans')
}

describe('VisitTableComponent', () => {
  let component: VisitTableComponent;
  let fixture: ComponentFixture<VisitTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitTableComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {provide: VisitService, useClass: VisitServiceStub},
        {provide: SearchService, useClass: SearchServiceStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call visitService and update visits', () => {
    let visitServiceStub = fixture.debugElement.injector.get(VisitService);
    component.updateTable('rabies');
    expect(component.visits[0].description).toEqual('rabies shot');
    let VisitTableDescriptionColumn = fixture.nativeElement.querySelector('.visit-description');
    expect(VisitTableDescriptionColumn.innerText).toContain('rabies shot');
  });
});
