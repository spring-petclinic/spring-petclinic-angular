import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetShowVisitsComponent } from './vet-show-visits.component';

describe('VetShowVisitsComponent', () => {
  let component: VetShowVisitsComponent;
  let fixture: ComponentFixture<VetShowVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
