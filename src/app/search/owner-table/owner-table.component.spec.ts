import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTableComponent } from './owner-table.component';
import { Owner } from 'app/owners/owner';
import { OwnerService } from 'app/owners/owner.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchService } from '../search.service';


class SearchServiceStub {
  ownersChecked = true;
  searchTerm = new BehaviorSubject<string>('hans')
}

class OwnerServiceStub {
  getOwnersBySearchTerm(searchTerm: string, noLimit:boolean): Observable<Owner[]> {
    return of([{
      id: 1,
      firstName: 'Hans',
      lastName: 'Wurst',
      address: 'HansWuerster-Alee 27',
      city: 'HansWurstHausen',
      telephone: '08007218281',
      pets: []
    }] as Owner[]);
  }
}

describe('OwnerTableComponent', () => {
  let component: OwnerTableComponent;
  let fixture: ComponentFixture<OwnerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerTableComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {provide: OwnerService, useClass: OwnerServiceStub},
        {provide: SearchService, useClass: SearchServiceStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ownerService and display owners', () => {
    let ownerServiceStub = fixture.debugElement.injector.get(OwnerService);
    component.updateTable('hans');
    expect(component.owners[0].lastName).toEqual('Wurst');
    let ownerTableOwnerFullNameColumn = 
      fixture.nativeElement.querySelector('.ownerFullName');
    expect(ownerTableOwnerFullNameColumn.innerText).toContain('Hans Wurst');
  });
});