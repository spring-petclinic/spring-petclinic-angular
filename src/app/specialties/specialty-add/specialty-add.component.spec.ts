/*
 *
 *  * Copyright 2017-2018 the original author or authors.
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Specialty} from '../specialty';
import { SpecialtyAddComponent } from './specialty-add.component';
import {SpecialtyService} from "../specialty.service";
import {FormsModule} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {RouterStub, ActivatedRouteStub} from '../../testing/router-stubs';
import Spy = jasmine.Spy;
import {Observable} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';

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
      imports: [FormsModule, HttpClientModule],
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
