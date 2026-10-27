import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { PetEditComponent } from './pet-edit.component';
import { PetService } from '../pet.service';
import { OwnerService } from '../../owners/owner.service';
import { PetTypeService } from '../../pettypes/pettype.service';
import { RouterStub } from '../../testing/router-stubs';
import { setValue, submitButton, submitForm } from '../../testing/form-utils';

describe('PetEditComponent', () => {
    let component: PetEditComponent;
    let fixture: ComponentFixture<PetEditComponent>;
    let router: Router;
    const owner = { id: 1, firstName: 'George', lastName: 'Franklin' };
    const cat = { id: 1, name: 'cat' };
    const dog = { id: 2, name: 'dog' };
    const pet = { id: 7, name: 'Leo', birthDate: '2010-09-07', type: cat, ownerId: 1 };
    const petService = { getPetById: () => of(pet), updatePet: vi.fn(() => of({})) };

    beforeEach(async () => {
        petService.updatePet.mockClear();
        await TestBed.configureTestingModule({
            declarations: [PetEditComponent],
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

        fixture = TestBed.createComponent(PetEditComponent);
        fixture.componentRef.setInput('id', 7);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        vi.spyOn(router, 'navigate');
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create PetEditComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should display the loaded pet', () => {
        expect(fixture.nativeElement.querySelector('#name').value).toBe('Leo');
        expect(fixture.nativeElement.querySelector('#birthDate').value).toBe('9/7/2010');
        expect(fixture.nativeElement.querySelector('#typeId').value).toBe('1');
        expect(submitButton(fixture).disabled).toBe(false);
    });

    it('should update the pet and go back to the owner', async () => {
        await setValue(fixture, '#name', 'Leon');
        await setValue(fixture, '#typeId', '2');

        await submitForm(fixture);

        expect(petService.updatePet).toHaveBeenCalledWith('7', {
            id: 7,
            owner: undefined,
            name: 'Leon',
            birthDate: '2010-09-07',
            type: dog
        });
        expect(router.navigate).toHaveBeenCalledWith(['/owners', 1]);
    });

    it('should disable the submit button when the name is empty', async () => {
        await setValue(fixture, '#name', '');
        expect(fixture.nativeElement.textContent).toContain('Name is required');
        expect(submitButton(fixture).disabled).toBe(true);
    });
});
