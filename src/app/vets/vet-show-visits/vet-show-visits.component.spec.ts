import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitService } from 'app/visits/visit.service';
import { VetService } from '../vet.service';

import { VetShowVisitsComponent } from './vet-show-visits.component';

describe('VetShowVisitsComponent', () => {
  let component: VetShowVisitsComponent;
  let fixture: ComponentFixture<VetShowVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[VisitService],
      declarations: [ VetShowVisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VetShowVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
