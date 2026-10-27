import type { Mock } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettypeEditComponent } from './pettype-edit.component';
import { PetTypeService } from '../pettype.service';
import { PetType } from '../pettype';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';
import { FormField, FormRoot } from '@angular/forms/signals';
import { of } from 'rxjs';
type Spy = Mock;

describe('PettypeEditComponent', () => {
    let component: PettypeEditComponent;
    let fixture: ComponentFixture<PettypeEditComponent>;
    let pettypeService: PetTypeService;
    let getSpy: Spy;
    let updateSpy: Spy;
    let router: Router;
    let testPettype: PetType;

    const nameInput = () => fixture.nativeElement.querySelector('#name') as HTMLInputElement;
    const typeName = async (value: string) => {
        nameInput().value = value;
        nameInput().dispatchEvent(new Event('input'));
        await fixture.whenStable();
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [FormField, FormRoot, PettypeEditComponent],
    providers: [
        { provide: PetTypeService, useValue: { getPetTypeById: () => of(), updatePetType: () => of() } },
        { provide: Router, useClass: RouterStub }
    ]
})
            .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(PettypeEditComponent);
        fixture.componentRef.setInput('id', 1);
        component = fixture.componentInstance;
        testPettype = {
            id: 1,
            name: 'test'
        };

        pettypeService = TestBed.inject(PetTypeService);
        router = TestBed.inject(Router);
        vi.spyOn(router, 'navigate');
        getSpy = vi.spyOn(pettypeService, 'getPetTypeById').mockReturnValue(of(testPettype));
        updateSpy = vi.spyOn(pettypeService, 'updatePetType').mockReturnValue(of(testPettype));

        await fixture.whenStable();
    });

    it('should create PettypeEditComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should display the loaded name', () => {
        expect(nameInput().value).toBe('test');
    });

    it('should show an error and disable update when the name is empty', async () => {
        await typeName('');
        expect(fixture.nativeElement.textContent).toContain('Name is required');
        expect(fixture.nativeElement.querySelector('button[type=submit]').disabled).toBe(true);
    });

    it('should reject a name that does not begin with a letter or digit', async () => {
        await typeName('-dog');
        expect(fixture.nativeElement.textContent).toContain('Name must begin with a letter or digit');
    });

    it('should reject a name longer than 80 characters', async () => {
        await typeName('a'.repeat(81));
        expect(fixture.nativeElement.textContent).toContain('Name may be only 80 characters long');
    });

    it('should update the pet type and go back on submit', async () => {
        await typeName('dog');
        fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
        await fixture.whenStable();
        expect(updateSpy).toHaveBeenCalledWith('1', { id: 1, name: 'dog' });
        expect(router.navigate).toHaveBeenCalledWith(['/pettypes']);
    });
});
