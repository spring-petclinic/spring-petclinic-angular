import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { of } from 'rxjs';

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
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [FormField, FormRoot, MatDatepickerModule, MatMomentDateModule, PetAddComponent],
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
});
