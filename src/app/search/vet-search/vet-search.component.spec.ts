import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetSearchComponent } from './vet-search.component';

describe('VetSearchComponent', () => {
  let component: VetSearchComponent;
  let fixture: ComponentFixture<VetSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VetSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
