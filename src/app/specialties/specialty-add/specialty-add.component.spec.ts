import type { Mock } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Specialty } from '../specialty';
import { SpecialtyAddComponent } from './specialty-add.component';
import { SpecialtyService } from '../specialty.service';
import { FormField, FormRoot } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../testing/router-stubs';
import { setValue, submitButton, submitForm } from '../../testing/form-utils';
import { Observable, of } from 'rxjs';
type Spy = Mock;

class SpecialityServiceStub {
    addSpecialty(specialty: Specialty): Observable<Specialty> {
        return of();
    }
}

describe('SpecialtyAddComponent', () => {
    let component: SpecialtyAddComponent;
    let fixture: ComponentFixture<SpecialtyAddComponent>;
    let specialtyService: SpecialtyService;
    let spy: Spy;
    let testSpecialty: Specialty;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [FormField, FormRoot, SpecialtyAddComponent],
    providers: [
        { provide: SpecialtyService, useClass: SpecialityServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
    ],
}).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(SpecialtyAddComponent);
        component = fixture.componentInstance;
        testSpecialty = {
            id: 1,
            name: 'test',
        };

        specialtyService = fixture.debugElement.injector.get(SpecialtyService);
        spy = vi.spyOn(specialtyService, 'addSpecialty').mockReturnValue(of(testSpecialty));

        fixture.detectChanges();
    });

    it('should create SpecialtyAddComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should disable the submit button until the name is valid', async () => {
        expect(submitButton(fixture).disabled).toBe(true);
        await setValue(fixture, '#name', '-dentistry');
        expect(fixture.nativeElement.textContent).toContain('Name must begin with a letter or digit');
        expect(submitButton(fixture).disabled).toBe(true);
        await setValue(fixture, '#name', 'dentistry');
        expect(submitButton(fixture).disabled).toBe(false);
    });

    it('should add the specialty and emit it', async () => {
        const added = vi.fn();
        component.newSpeciality.subscribe(added);
        await setValue(fixture, '#name', 'dentistry');

        await submitForm(fixture);

        expect(spy).toHaveBeenCalledWith({ name: 'dentistry' });
        expect(added).toHaveBeenCalledWith(testSpecialty);
    });
});
