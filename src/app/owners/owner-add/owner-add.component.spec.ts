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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OwnerAddComponent } from './owner-add.component';
import { FormField, FormRoot } from '@angular/forms/signals';
import { provideRouter, Router } from '@angular/router';
import { OwnerService } from '../owner.service';
import { RouterStub } from '../../testing/router-stubs';
import { Owner } from '../owner';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { OwnerListComponent } from '../owner-list/owner-list.component';

class OwnserServiceStub {
    addOwner(owner: Owner): Observable<Owner> {
        return of(owner);
    }
}

describe('OwnerAddComponent', () => {
    let component: OwnerAddComponent;
    let fixture: ComponentFixture<OwnerAddComponent>;
    let router: Router;

    const setValue = async (selector: string, value: string) => {
        const input = fixture.nativeElement.querySelector(selector) as HTMLInputElement;
        input.value = value;
        input.dispatchEvent(new Event('input'));
        await fixture.whenStable();
    };
    const submitButton = () => fixture.nativeElement.querySelector('button[type=submit]') as HTMLButtonElement;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [FormField, FormRoot, OwnerAddComponent],
    providers: [
        provideRouter([]),
        { provide: OwnerService, useClass: OwnserServiceStub },
        { provide: Router, useClass: RouterStub },
    ],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OwnerAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        router = TestBed.inject(Router);
        vi.spyOn(router, 'navigate').mockReturnValue(undefined);
    });

    it('should create OwnerAddComponent', () => {
        expect(component).toBeTruthy();
    });



    it('back button routing', async () => {
        let buttons = fixture.debugElement.queryAll(By.css('button'));
        let backbutton = buttons[0];
        backbutton.triggerEventHandler('click', null);
        vi.spyOn(component, 'gotoOwnersList');
        expect(router.navigate).toHaveBeenCalledWith(['/owners']);
    });


    it('add owner', async () => {
        const addOwner = vi.spyOn(TestBed.inject(OwnerService), 'addOwner');
        await setValue('#firstName', 'George');
        await setValue('#lastName', 'Franklin');
        await setValue('#address', '110 W. Liberty St.');
        await setValue('#city', 'Madison');
        await setValue('#telephone', '6085551023');
        expect(submitButton().disabled).toBe(false);

        fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
        await fixture.whenStable();

        expect(addOwner).toHaveBeenCalledWith({
            id: null,
            firstName: 'George',
            lastName: 'Franklin',
            address: '110 W. Liberty St.',
            city: 'Madison',
            telephone: '6085551023'
        });
        expect(router.navigate).toHaveBeenCalledWith(['/owners']);
    });

    it('should disable the submit button until the form is valid', () => {
        expect(submitButton().disabled).toBe(true);
    });

    it('should require exactly 10 digits for the telephone', async () => {
        await setValue('#telephone', '608555102');
        expect(fixture.nativeElement.textContent).toContain('Phone number must be exactly 10 digits');
        await setValue('#telephone', '60855510234');
        expect(fixture.nativeElement.textContent).toContain('Phone number must be exactly 10 digits');
        expect(fixture.nativeElement.querySelector('#telephone').maxLength).toBe(10);
        await setValue('#telephone', '6085551023');
        expect(fixture.nativeElement.textContent).not.toContain('Phone number must be exactly 10 digits');
    });

    it('should reject blank address and city', async () => {
        await setValue('#address', ' ');
        await setValue('#city', '  ');
        const text = fixture.nativeElement.textContent;
        expect(text).toContain('Address is required');
        expect(text).toContain('City is required');
        expect(submitButton().disabled).toBe(true);
    });

    it('should show validation errors', async () => {
        await setValue('#firstName', 'George1');
        await setValue('#telephone', '60855a');
        await setValue('#city', '');
        const text = fixture.nativeElement.textContent;
        expect(text).toContain('First name must consist of letters only');
        expect(text).toContain('Phone number only accepts digits');
        expect(text).toContain('City is required');
        expect(submitButton().disabled).toBe(true);
    });

});
