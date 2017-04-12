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
import {By} from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA} from '@angular/core';

import {OwnerListComponent} from './owner-list.component';
import {FormsModule} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {OwnerService} from '../owner.service';
import Spy = jasmine.Spy;
import {Owner} from '../owner';
import {HttpModule} from '@angular/http';
import {Observable} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {WelcomeComponent} from '../../parts/welcome/welcome.component';
import {PartsModule} from '../../parts/parts.module';
import {RouterStub, ActivatedRouteStub} from '../../testing/router-stubs';
import {OwnerDetailComponent} from '../owner-detail/owner-detail.component';
import {OwnersModule} from '../owners.module';
import {DummyComponent} from '../../testing/dummy.component';
import {OwnerAddComponent} from '../owner-add/owner-add.component';
import {OwnerEditComponent} from '../owner-edit/owner-edit.component';


describe('OwnerListComponent', () => {

  let component: OwnerListComponent;
  let fixture: ComponentFixture<OwnerListComponent>;
  let ownerService: OwnerService;
  let spy: Spy;
  let de: DebugElement;
  let el: HTMLElement;


  const testOwner: Owner = {
    id: 1,
    firstName: 'George',
    lastName: 'Franklin',
    address: '110 W. Liberty St.',
    city: 'Madison',
    telephone: '6085551023',
    pets: null
  };
  let testOwners: Owner[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [CommonModule, FormsModule, HttpModule, PartsModule, OwnersModule,
        RouterTestingModule.withRoutes(
          [{path: 'owners', component: OwnerListComponent},
            {path: 'owners/add', component: OwnerAddComponent},
            {path: 'owners/:id', component: OwnerDetailComponent},
            {path: 'owners/:id/edit', component: OwnerEditComponent}
          ])],
      providers: [
        OwnerService,
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testOwners = [{
      id: 1,
      firstName: 'George',
      lastName: 'Franklin',
      address: '110 W. Liberty St.',
      city: 'Madison',
      telephone: '6085551023',
      pets: [{
        id: 1,
        name: 'Leo',
        birthDate: '2010-09-07',
        type: {id: 1, name: 'cat'},
        owner: null,
        visits: null
      }]
    }];

    fixture = TestBed.createComponent(OwnerListComponent);
    component = fixture.componentInstance;
    ownerService = fixture.debugElement.injector.get(OwnerService);
    // component.owners = testOwners;
    spy = spyOn(ownerService, 'getOwners')
      .and.returnValue(Observable.of(testOwners));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO  need fix - this part "routerLink="/owners/{{owner.id}}" routerLinkActive="active"" in html template cause test error
  // it('should call ngOnInit() method', () => {
  //   fixture.detectChanges();
  //   expect(spy.calls.any()).toBe(true, 'getOwners called');
  // });

  // TODO  need fix - this part "routerLink="/owners/{{owner.id}}" routerLinkActive="active"" in html template cause test error
  // it(' should show full name after getOwners observable (async) ', async(() => {
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => { // wait for async getOwners
  //     fixture.detectChanges();        // update view with name
  //     de = fixture.debugElement.query(By.css('.ownerFullName'));
  //     el = de.nativeElement;
  //     expect(el.innerText).toBe((testOwner.firstName.toString() + ' ' + testOwner.lastName.toString()));
  //   });
  // }));

});
