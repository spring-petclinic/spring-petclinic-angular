import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitTableComponent } from './visit-table.component';
import { VisitService } from 'app/visits/visit.service';
import {Observable, of} from 'rxjs';
import { Visit } from 'app/visits/visit';
import { Router } from '@angular/router';
import { RouterStub } from 'app/testing/router-stubs';


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
        {provide: Router, useClass: RouterStub},
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
