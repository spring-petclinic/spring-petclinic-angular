import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PettypeEditComponent } from './pettype-edit.component';
import {SpecialtyService} from "../../specialties/specialty.service";
import {Specialty} from "../../specialties/specialty";
import Spy = jasmine.Spy;
import {PetTypeService} from "../pettype.service";
import {PetType} from "../pettype";
import {HttpModule} from "@angular/http";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivatedRouteStub, RouterStub} from "../../testing/router-stubs";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Rx";

describe('PettypeEditComponent', () => {
  let component: PettypeEditComponent;
  let fixture: ComponentFixture<PettypeEditComponent>;
  let pettypeService: PetTypeService;
  let spy: Spy;
  let testPettype: PetType;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PettypeEditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, HttpModule],
      providers: [
        PetTypeService,
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PettypeEditComponent);
    component = fixture.componentInstance;
    testPettype = {
      id: 1,
      name: 'test'
    };

    pettypeService = fixture.debugElement.injector.get(PetTypeService);
    spy = spyOn(pettypeService, 'getPetTypeById')
      .and.returnValue(Observable.of(testPettype));

    fixture.detectChanges();
  });

  it('should create PettypeEditComponent', () => {
    expect(component).toBeTruthy();
  });
});
