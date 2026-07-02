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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {VetEditComponent} from './vet-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpecialtyService} from '../../specialties/specialty.service';
import {VetService} from '../vet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterStub} from '../../testing/router-stubs';
import {Observable, of} from 'rxjs';
import {Specialty} from '../../specialties/specialty';
import {Vet} from '../vet';

class SpecialtyServiceStub {
  getSpecialties(): Observable<Specialty[]> {
    return of([]);
  }
}

class VetServiceStub {
  updateVet(id: string, vet: Vet): Observable<Vet> {
    return of(vet);
  }
}

describe('VetEditComponent', () => {
  let component: VetEditComponent;
  let fixture: ComponentFixture<VetEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VetEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {provide: SpecialtyService, useClass: SpecialtyServiceStub},
        {provide: VetService, useClass: VetServiceStub},
        {provide: Router, useClass: RouterStub},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                specs: [],
                vet: {id: 1, firstName: 'James', lastName: 'Carter', specialties: []}
              }
            }
          }
        }
      ]
    })
      .overrideComponent(VetEditComponent, {
        set: {template: ''}
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
