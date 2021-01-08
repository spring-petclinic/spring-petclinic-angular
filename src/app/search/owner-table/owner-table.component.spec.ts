import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTableComponent } from './owner-table.component';
import { Owner } from 'app/owners/owner';
import { OwnerService } from 'app/owners/owner.service';
import { Observable, of } from 'rxjs';


class OwnerServiceStub {
  getOwnerById(): Observable<Owner> {
    return of( { id: 1, lastName: 'Salamanca' } as Owner );
  }
}

describe('OwnerTableComponent', () => {
  let component: OwnerTableComponent;
  let fixture: ComponentFixture<OwnerTableComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerTableComponent ],
      providers: [
        {provide: OwnerService, useClass: OwnerServiceStub},
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
});
