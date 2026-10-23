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

import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OwnerEditComponent } from './owner-edit.component';
import { FormField, FormRoot } from '@angular/forms/signals';
import { OwnerService } from '../owner.service';
import { provideRouter, Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';
import { Owner } from '../owner';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { OwnerListComponent } from '../owner-list/owner-list.component';

class OwnserServiceStub {
    getOwnerById(): Observable<Owner> {
        return of({ id: 1, firstName: 'James', lastName: 'Carter', address: '2749 Blackhawk Trail', city: 'Madison', telephone: '6085552765' } as Owner);
    }
    updateOwner(): Observable<Owner> {
        return of({} as Owner);
    }
}

describe('OwnerEditComponent', () => {
    let component: OwnerEditComponent;
    let fixture: ComponentFixture<OwnerEditComponent>;
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
            declarations: [OwnerEditComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            // schemas: [ NO_ERRORS_SCHEMA ],
            imports: [FormField, FormRoot],
            providers: [
                provideRouter([{ path: 'owners', component: OwnerListComponent }]),
                { provide: OwnerService, useClass: OwnserServiceStub },
                { provide: Router, useClass: RouterStub },
            ],
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(OwnerEditComponent);
        fixture.componentRef.setInput('id', 1);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        router = TestBed.inject(Router);
        vi.spyOn(router, 'navigate').mockReturnValue(undefined);
    });

    it('should create OwnerEditComponent', () => {
        expect(component).toBeTruthy();
    });

    it('back button routing', async () => {
        let buttons = fixture.debugElement.queryAll(By.css('button'));
        let backbutton = buttons[0];
        backbutton.triggerEventHandler('click', null);
        vi.spyOn(component, 'gotoOwnerDetail');
        expect(router.navigate).toHaveBeenCalledWith(['/owners', 1]);
    });


    it('should display the loaded owner', () => {
        expect(fixture.nativeElement.querySelector('#firstName').value).toBe('James');
        expect(fixture.nativeElement.querySelector('#telephone').value).toBe('6085552765');
        expect(submitButton().disabled).toBe(false);
    });

    it('update owner', async () => {
        const updateOwner = vi.spyOn(TestBed.inject(OwnerService), 'updateOwner');
        await setValue('#city', 'Windsor');

        fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
        await fixture.whenStable();

        expect(updateOwner).toHaveBeenCalledWith(1, {
            id: 1,
            firstName: 'James',
            lastName: 'Carter',
            address: '2749 Blackhawk Trail',
            city: 'Windsor',
            telephone: '6085552765'
        });
        expect(router.navigate).toHaveBeenCalledWith(['/owners', 1]);
    });

    it('should disable the submit button when the form is invalid', async () => {
        await setValue('#telephone', 'abc');
        expect(fixture.nativeElement.textContent).toContain('Phone number only accepts digits');
        expect(submitButton().disabled).toBe(true);
    });

});
