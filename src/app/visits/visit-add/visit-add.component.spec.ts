import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { VisitAddComponent } from './visit-add.component';
import { VisitService } from '../visit.service';
import { PetService } from '../../pets/pet.service';
import { OwnerService } from '../../owners/owner.service';
import { RouterStub } from '../../testing/router-stubs';
import { setValue, submitButton, submitForm } from '../../testing/form-utils';

describe('VisitAddComponent', () => {
    let component: VisitAddComponent;
    let fixture: ComponentFixture<VisitAddComponent>;
    let router: Router;
    const pet = { id: 1, name: 'Leo', ownerId: 1, visits: [] };
    const visitService = { addVisit: vi.fn(() => of({})) };

    beforeEach(async () => {
        visitService.addVisit.mockClear();
        await TestBed.configureTestingModule({
            declarations: [VisitAddComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [FormField, FormRoot, MatDatepickerModule, MatMomentDateModule],
            providers: [
                { provide: PetService, useValue: { getPetById: () => of(pet) } },
                { provide: VisitService, useValue: visitService },
                { provide: OwnerService, useValue: { getOwnerById: () => of({ id: 5 }) } },
                { provide: Router, useClass: RouterStub }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(VisitAddComponent);
        fixture.componentRef.setInput('id', 1);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        vi.spyOn(router, 'navigate');
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create VisitAddComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should disable the submit button until the form is valid', async () => {
        expect(submitButton(fixture).disabled).toBe(true);
        await setValue(fixture, '#description', 'rabies shot');
        await setValue(fixture, '#date', '3/4/2024');
        expect(submitButton(fixture).disabled).toBe(false);
    });

    it('should reject a blank description', async () => {
        await setValue(fixture, '#date', '3/4/2024');
        await setValue(fixture, '#description', ' ');
        expect(fixture.nativeElement.textContent).toContain('Description is required');
        expect(submitButton(fixture).disabled).toBe(true);
    });

    it('should add the visit and go back to the owner', async () => {
        await setValue(fixture, '#date', '3/4/2024');
        await setValue(fixture, '#description', 'rabies shot');

        await submitForm(fixture);

        expect(visitService.addVisit).toHaveBeenCalledWith({
            id: null,
            pet,
            date: '2024-03-04',
            description: 'rabies shot'
        });
        expect(router.navigate).toHaveBeenCalledWith(['/owners', 5]);
    });
});
