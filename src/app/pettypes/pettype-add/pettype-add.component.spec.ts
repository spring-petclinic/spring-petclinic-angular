import type { Mock } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettypeAddComponent } from './pettype-add.component';
import { PetTypeService } from '../pettype.service';
import { PetType } from '../pettype';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../testing/router-stubs';
import { setValue, submitButton, submitForm } from '../../testing/form-utils';
import { FormField, FormRoot } from '@angular/forms/signals';
import { Observable, of } from 'rxjs';
type Spy = Mock;

class PetTypeServiceStub {
    addPetType(petType: PetType): Observable<PetType> {
        return of();
    }
}

describe('PettypeAddComponent', () => {
    let component: PettypeAddComponent;
    let fixture: ComponentFixture<PettypeAddComponent>;
    let pettypeService: PetTypeService;
    let spy: Spy;
    let testPettype: PetType;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PettypeAddComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [FormField, FormRoot],
            providers: [
                { provide: PetTypeService, useClass: PetTypeServiceStub },
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useClass: ActivatedRouteStub }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PettypeAddComponent);
        component = fixture.componentInstance;
        testPettype = {
            id: 1,
            name: 'test'
        };

        pettypeService = fixture.debugElement.injector.get(PetTypeService);
        spy = vi.spyOn(pettypeService, 'addPetType').mockReturnValue(of(testPettype));

        fixture.detectChanges();
    });

    it('should create PettypeAddComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should disable the submit button until the name is valid', async () => {
        expect(submitButton(fixture).disabled).toBe(true);
        await setValue(fixture, '#name', 'a'.repeat(81));
        expect(fixture.nativeElement.textContent).toContain('Name may be only 80 characters long');
        expect(submitButton(fixture).disabled).toBe(true);
        await setValue(fixture, '#name', 'hamster');
        expect(submitButton(fixture).disabled).toBe(false);
    });

    it('should add the pet type and emit it', async () => {
        const added = vi.fn();
        component.newPetType.subscribe(added);
        await setValue(fixture, '#name', 'hamster');

        await submitForm(fixture);

        expect(spy).toHaveBeenCalledWith({ id: null, name: 'hamster' });
        expect(added).toHaveBeenCalledWith(testPettype);
    });
});
