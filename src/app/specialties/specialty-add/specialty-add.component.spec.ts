import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyAddComponent } from './specialty-add.component';

describe('SpecialtyAddComponent', () => {
  let component: SpecialtyAddComponent;
  let fixture: ComponentFixture<SpecialtyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialtyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
