import type { Mock } from 'vitest';
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Specialty } from '../specialty';
import { SpecialtyEditComponent } from './specialty-edit.component';
import { SpecialtyService } from '../specialty.service';
import { FormField, FormRoot } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';
import { setValue, submitButton, submitForm } from '../../testing/form-utils';
import { Observable, of } from 'rxjs';
type Spy = Mock;

class SpecialityServiceStub {
    getSpecialtyById(specId: string): Observable<Specialty> {
        return of();
    }
    updateSpecialty(specId: string, specialty: Specialty): Observable<Specialty> {
        return of(specialty);
    }
}

describe('SpecialtyEditComponent', () => {
    let component: SpecialtyEditComponent;
    let fixture: ComponentFixture<SpecialtyEditComponent>;
    let specialtyService: SpecialtyService;
    let spy: Spy;
    let testSpecialty: Specialty;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SpecialtyEditComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [FormField, FormRoot],
            providers: [
                { provide: SpecialtyService, useClass: SpecialityServiceStub },
                { provide: Router, useClass: RouterStub }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SpecialtyEditComponent);
        fixture.componentRef.setInput('id', 1);
        component = fixture.componentInstance;
        testSpecialty = {
            id: 1,
            name: 'test'
        };

        specialtyService = fixture.debugElement.injector.get(SpecialtyService);
        spy = vi.spyOn(specialtyService, 'getSpecialtyById').mockReturnValue(of(testSpecialty));

        fixture.detectChanges();
    });

    it('should create SpecialtyEditComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should display the loaded specialty', async () => {
        await fixture.whenStable();
        expect(fixture.nativeElement.querySelector('#name').value).toBe('test');
    });

    it('should update the specialty and go back to the list', async () => {
        const updateSpy = vi.spyOn(specialtyService, 'updateSpecialty').mockReturnValue(of(testSpecialty));
        const router = TestBed.inject(Router);
        vi.spyOn(router, 'navigate');
        await fixture.whenStable();
        await setValue(fixture, '#name', 'surgery');

        await submitForm(fixture);

        expect(updateSpy).toHaveBeenCalledWith('1', { id: 1, name: 'surgery' });
        expect(router.navigate).toHaveBeenCalledWith(['/specialties']);
    });

    it('should disable the submit button when the name is empty', async () => {
        await fixture.whenStable();
        await setValue(fixture, '#name', '');
        expect(fixture.nativeElement.textContent).toContain('Name is required');
        expect(submitButton(fixture).disabled).toBe(true);
    });
});
