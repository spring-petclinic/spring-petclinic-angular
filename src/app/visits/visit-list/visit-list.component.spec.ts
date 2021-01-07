import { Vet } from './../../vets/vet';
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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {VisitListComponent} from './visit-list.component';
import {FormsModule} from '@angular/forms';
import {VisitService} from '../visit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {Visit} from '../visit';
import {Pet} from '../../pets/pet';
import {Observable, of} from 'rxjs';
import Spy = jasmine.Spy;
import { VetService } from 'app/vets/vet.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorHandler } from 'app/error.service';

class VisitServiceStub {
  deleteVisit(visitId: string): Observable<number> {
    return of();
  }
}

describe('VisitListComponent', () => {
  let component: VisitListComponent;
  let fixture: ComponentFixture<VisitListComponent>;
  let visitService: VisitService;
  let testVisits: Visit[];
  let testPet: Pet;
  let testVet: Vet;
  let spy: Spy;
  let responseStatus: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisitListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        VetService,
        HttpErrorHandler,
        {provide: VisitService, useClass: VisitServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitListComponent);
    component = fixture.componentInstance;
    testPet = {
      id: 1,
      name: 'Leo',
      birthDate: '2010-09-07',
      type: {id: 1, name: 'cat'},
      owner: {
        id: 1,
        firstName: 'George',
        lastName: 'Franklin',
        address: '110 W. Liberty St.',
        city: 'Madison',
        telephone: '6085551023',
        pets: null
      },
      visits: null
    };

    testVet = {
      id: 2,
      firstName: 'Helen',
      lastName: 'Leary',
      specialties: [

      ],
    };
    testVisits =  [{
      id: 1,
      date: '2016-09-07',
      description: '',
      pet: testPet,
      vet: testVet.id,
      vetFirstName: testVet.firstName,
      vetLastName: testVet.lastName,
      vetName: testVet.firstName + " " +testVet.lastName
    }];


    visitService = fixture.debugElement.injector.get(VisitService);
    responseStatus = 204; // success delete return NO_CONTENT
    component.visits = testVisits;

    /*spy = spyOn(visitService, 'deleteVisit')
      .and.returnValue(of(responseStatus));*/

    fixture.detectChanges();
  });

  /*it('should create VisitListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteVisit() method', () => {
    fixture.detectChanges();
    component.deleteVisit(component.visits[0]);
    expect(spy.calls.any()).toBe(true, 'deleteVisit called');
  });*/

});
