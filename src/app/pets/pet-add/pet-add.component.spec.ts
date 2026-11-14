import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import moment from 'moment';

import { PetAddComponent } from './pet-add.component';
import { PetService } from '../pet.service';
import { OwnerService } from '../../owners/owner.service';
import { PetTypeService } from '../../pettypes/pettype.service';
import { RouterStub } from '../../testing/router-stubs';
import { setValue, submitButton, submitForm } from '../../testing/form-utils';

describe('PetAddComponent', () => {
    let component: PetAddComponent;
    let fixture: ComponentFixture<PetAddComponent>;
    let router: Router;
    const owner = { id: 1, firstName: 'George', lastName: 'Franklin' };
    const cat = { id: 1, name: 'cat' };
    const dog = { id: 2, name: 'dog' };
    const petService = { addPet: vi.fn(() => of({})) };

    beforeEach(async () => {
        petService.addPet.mockClear();
        await TestBed.configureTestingModule({
            declarations: [PetAddComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [FormField, FormRoot, MatDatepickerModule, MatMomentDateModule],
            providers: [
                { provide: PetService, useValue: petService },
                { provide: OwnerService, useValue: { getOwnerById: () => of(owner) } },
                { provide: PetTypeService, useValue: { getPetTypes: () => of([cat, dog]) } },
                { provide: Router, useClass: RouterStub }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PetAddComponent);
        fixture.componentRef.setInput('id', 1);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        vi.spyOn(router, 'navigate');
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create PetAddComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should show the owner and disable the submit button until the form is valid', () => {
        expect(fixture.nativeElement.querySelector('#owner_name').value).toBe('George Franklin');
        expect(submitButton(fixture).disabled).toBe(true);
    });

    it('should show validation errors', async () => {
        await setValue(fixture, '#name', '-Leo');
        expect(fixture.nativeElement.textContent).toContain('Name must begin with a letter or digit');
    });

    it('should add the pet and go back to the owner', async () => {
        await setValue(fixture, '#name', 'Leo');
        await setValue(fixture, '#birthDate', '9/7/2010');
        await setValue(fixture, '#typeId', '2');
        expect(submitButton(fixture).disabled).toBe(false);

        await submitForm(fixture);

        expect(petService.addPet).toHaveBeenCalledWith({
            id: null,
            owner,
            name: 'Leo',
            birthDate: '2010-09-07',
            type: dog
        });
        expect(router.navigate).toHaveBeenCalledWith(['/owners', 1]);
    });

    it('should reject a birth date in the future', async () => {
        await setValue(fixture, '#name', 'Leo');
        await setValue(fixture, '#typeId', '2');
        await setValue(fixture, '#birthDate', moment().add(1, 'day').format('M/D/YYYY'));
        expect(fixture.nativeElement.textContent).toContain('Birth date cannot be in the future');
        expect(submitButton(fixture).disabled).toBe(true);
    });

    it('should reject a birth date older than 50 years', async () => {
        await setValue(fixture, '#name', 'Leo');
        await setValue(fixture, '#typeId', '2');
        await setValue(fixture, '#birthDate', moment().subtract(50, 'years').subtract(1, 'day').format('M/D/YYYY'));
        expect(fixture.nativeElement.textContent).toContain('Birth date cannot be older than 50 years');
        expect(submitButton(fixture).disabled).toBe(true);
    });

    it('should accept today and the date 50 years ago as birth dates', async () => {
        await setValue(fixture, '#name', 'Leo');
        await setValue(fixture, '#typeId', '2');
        await setValue(fixture, '#birthDate', moment().format('M/D/YYYY'));
        expect(submitButton(fixture).disabled).toBe(false);
        await setValue(fixture, '#birthDate', moment().subtract(50, 'years').format('M/D/YYYY'));
        expect(submitButton(fixture).disabled).toBe(false);
    });
});
