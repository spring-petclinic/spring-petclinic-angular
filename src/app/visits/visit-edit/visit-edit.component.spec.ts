import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { VisitEditComponent } from './visit-edit.component';
import { VisitService } from '../visit.service';
import { PetService } from '../../pets/pet.service';
import { OwnerService } from '../../owners/owner.service';
import { RouterStub } from '../../testing/router-stubs';
import { setValue, submitButton, submitForm } from '../../testing/form-utils';

describe('VisitEditComponent', () => {
    let component: VisitEditComponent;
    let fixture: ComponentFixture<VisitEditComponent>;
    let router: Router;
    const pet = { id: 1, name: 'Leo', ownerId: 1 };
    const visit = { id: 3, date: '2024-03-04', description: 'rabies shot', petId: 1 };
    const visitService = { getVisitById: () => of(visit), updateVisit: vi.fn(() => of({})) };

    beforeEach(async () => {
        visitService.updateVisit.mockClear();
        await TestBed.configureTestingModule({
            declarations: [VisitEditComponent],
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

        fixture = TestBed.createComponent(VisitEditComponent);
        fixture.componentRef.setInput('id', 3);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        vi.spyOn(router, 'navigate');
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create VisitEditComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should display the loaded visit', () => {
        expect(fixture.nativeElement.querySelector('#date').value).toBe('3/4/2024');
        expect(fixture.nativeElement.querySelector('#description').value).toBe('rabies shot');
        expect(submitButton(fixture).disabled).toBe(false);
    });

    it('should update the visit and go back to the owner', async () => {
        await setValue(fixture, '#description', 'check-up');

        await submitForm(fixture);

        expect(visitService.updateVisit).toHaveBeenCalledWith(3, {
            id: 3,
            pet,
            date: '2024-03-04',
            description: 'check-up'
        });
        expect(router.navigate).toHaveBeenCalledWith(['/owners', 5]);
    });

    it('should disable the submit button when the description is blank', async () => {
        await setValue(fixture, '#description', '   ');
        expect(fixture.nativeElement.textContent).toContain('Description is required');
        expect(submitButton(fixture).disabled).toBe(true);
    });

    it('should disable the submit button when the description is empty', async () => {
        await setValue(fixture, '#description', '');
        expect(fixture.nativeElement.textContent).toContain('Description is required');
        expect(submitButton(fixture).disabled).toBe(true);
    });
});
