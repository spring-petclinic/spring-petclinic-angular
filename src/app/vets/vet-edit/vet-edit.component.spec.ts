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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {VetEditComponent} from './vet-edit.component';
import {FormField, FormRoot} from '@angular/forms/signals';
import {MatSelectModule} from '@angular/material/select';
import {VetService} from '../vet.service';
import {Router} from '@angular/router';
import {RouterStub} from '../../testing/router-stubs';
import {Observable, of} from 'rxjs';
import {Vet} from '../vet';

class VetServiceStub {
  updateVet(id: string, vet: Vet): Observable<Vet> {
    return of(vet);
  }
}

describe('VetEditComponent', () => {
  let component: VetEditComponent;
  let fixture: ComponentFixture<VetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VetEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormField, FormRoot, MatSelectModule],
      providers: [
        {provide: VetService, useClass: VetServiceStub},
        {provide: Router, useClass: RouterStub}
      ]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(VetEditComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('specs', []);
    fixture.componentRef.setInput('vet', {id: 1, firstName: 'James', lastName: 'Carter', specialties: []});
    fixture.detectChanges();
    await fixture.whenStable();
  });

  const setValue = async (selector: string, value: string) => {
    const input = fixture.nativeElement.querySelector(selector) as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  };
  const submitButton = () => fixture.nativeElement.querySelector('button[type=submit]') as HTMLButtonElement;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill the form with the resolved vet', () => {
    expect(fixture.nativeElement.querySelector('#firstName').value).toBe('James');
    expect(fixture.nativeElement.querySelector('#lastName').value).toBe('Carter');
  });

  it('should update the vet and go back to the list', async () => {
    const updateVet = vi.spyOn(TestBed.inject(VetService), 'updateVet');
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate');
    await setValue('#firstName', 'Helen');

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    expect(updateVet).toHaveBeenCalledWith('1', {id: 1, firstName: 'Helen', lastName: 'Carter', specialties: []});
    expect(navigate).toHaveBeenCalledWith(['/vets']);
  });

  it('should disable the submit button when the form is invalid', async () => {
    await setValue('#lastName', 'C');
    expect(fixture.nativeElement.textContent).toContain('Last name must be at least 2 characters long');
    expect(submitButton().disabled).toBe(true);
  });
});
