/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/* tslint:disable:no-unused-variable */

/**
 * @author Vitaliy Fedoriv
 */

/**
 * @author Vitaliy Fedoriv
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {VetEditComponent} from './vet-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VetService} from '../vet.service';
import {SpecialtyService} from '../../specialties/specialty.service';
import {Vet} from '../vet';
import {Specialty} from '../../specialties/specialty';
import Spy = jasmine.Spy;
import {RouterTestingModule} from '@angular/router/testing';
import {DummyComponent} from '../../testing/dummy.component';
import {HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


describe('VetEditComponent', () => {
  let component: VetEditComponent;
  let fixture: ComponentFixture<VetEditComponent>;
  let spyVet: Spy;
  let spyVet2: Spy;
  let spySpec: Spy;
  let vetService: VetService;
  let specialtyService: SpecialtyService;
  let testVet: Vet;
  let testSpecialty: Specialty;
  let testSpecialties: Specialty[] = [];
  let spec_list: Specialty[] = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule,
        RouterTestingModule.withRoutes(
          [{path: 'vets', component: DummyComponent},
          {path: 'vets/add', component: DummyComponent},
          {path: 'vets/:id/edit', component: DummyComponent}
        ])],
      providers: [
        VetService,
        SpecialtyService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VetEditComponent);
    component = fixture.componentInstance;
    testSpecialty = {
      id: 1,
      name: 'radiology'
    };
    testSpecialties.push(testSpecialty);
    spec_list = testSpecialties;
    testVet = {
      id: 2,
      firstName: 'Helen',
      lastName: 'Leary',
      specialties: testSpecialties
    };
    vetService = fixture.debugElement.injector.get(VetService);
    specialtyService = fixture.debugElement.injector.get(SpecialtyService);
    spyVet = spyOn(vetService, 'updateVet')
      .and.returnValue(Observable.of(testVet));
    spyVet2 = spyOn(vetService, 'getVetById')
      .and.returnValue(Observable.of(testVet));
    spySpec = spyOn(specialtyService, 'getSpecialties')
      .and.returnValue(Observable.of(testSpecialties));
    fixture.detectChanges();
  });

  // TODO  should work
  // it('should create VetEditComponent', () => {
  //   expect(component).toBeTruthy();
  // });
});


// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {By} from '@angular/platform-browser';
// import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
//
// import {VetEditComponent} from './vet-edit.component';
// import {FormsModule} from '@angular/forms';
//
// describe('VetEditComponent', () => {
//   let component: VetEditComponent;
//   let fixture: ComponentFixture<VetEditComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [VetEditComponent],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//       imports: [FormsModule]
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(VetEditComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
// // TODO complete test
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
