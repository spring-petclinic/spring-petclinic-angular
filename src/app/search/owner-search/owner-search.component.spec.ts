import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSearchComponent } from './owner-search.component';

describe('OwnerSearchComponent', () => {
  let component: OwnerSearchComponent;
  let fixture: ComponentFixture<OwnerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
