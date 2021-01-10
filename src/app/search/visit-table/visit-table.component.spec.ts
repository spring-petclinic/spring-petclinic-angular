import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitTableComponent } from './visit-table.component';
import { VisitService } from 'app/visits/visit.service';
import {Observable, of} from 'rxjs';
import { Visit } from 'app/visits/visit';


class VisitServiceStub {
  getVisitById(): Observable<Visit> {
    return of( { id: 1, description: 'rabies' } as Visit );
  }
}

describe('VisitTableComponent', () => {
  let component: VisitTableComponent;
  let fixture: ComponentFixture<VisitTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitTableComponent ],
      providers: [
        {provide: VisitService, useClass: VisitServiceStub},
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
});
