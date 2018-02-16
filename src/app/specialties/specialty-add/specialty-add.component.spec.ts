import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Specialty} from '../specialty';
import { SpecialtyAddComponent } from './specialty-add.component';
import {SpecialtyService} from "../specialty.service";
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {RouterStub, ActivatedRouteStub} from '../../testing/router-stubs';
import Spy = jasmine.Spy;
import {Observable} from 'rxjs';

describe('SpecialtyAddComponent', () => {
  let component: SpecialtyAddComponent;
  let fixture: ComponentFixture<SpecialtyAddComponent>;
  let specialtyService: SpecialtyService;
  let spy: Spy;
  let testSpecialty: Specialty;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialtyAddComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, HttpModule],
      providers: [
        SpecialtyService,
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtyAddComponent);
    component = fixture.componentInstance;
    testSpecialty = {
      id: 1,
      name: 'test'
    };

    specialtyService = fixture.debugElement.injector.get(SpecialtyService);
    spy = spyOn(specialtyService, 'addSpecialty')
      .and.returnValue(Observable.of(testSpecialty));

    fixture.detectChanges();
  });

  it('should create SpecialtyAddComponent', () => {
    expect(component).toBeTruthy();
  });
});
