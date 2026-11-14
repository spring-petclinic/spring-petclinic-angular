import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { VetAddComponent } from './vet-add.component';
import { SpecialtyService } from '../../specialties/specialty.service';
import { VetService } from '../vet.service';
import { RouterStub } from '../../testing/router-stubs';
import { setValue, submitButton, submitForm } from '../../testing/form-utils';

describe('VetAddComponent', () => {
  let component: VetAddComponent;
  let fixture: ComponentFixture<VetAddComponent>;
  let router: Router;
  const radiology = { id: 1, name: 'radiology' };
  const surgery = { id: 2, name: 'surgery' };
  const vetService = { addVet: vi.fn(() => of({})) };

  beforeEach(async () => {
    vetService.addVet.mockClear();
    await TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [FormField, FormRoot, VetAddComponent],
    providers: [
        { provide: SpecialtyService, useValue: { getSpecialties: () => of([radiology, surgery]) } },
        { provide: VetService, useValue: vetService },
        { provide: Router, useClass: RouterStub }
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(VetAddComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the submit button until the form is valid', async () => {
    expect(submitButton(fixture).disabled).toBe(true);
    await setValue(fixture, '#firstName', 'Helen');
    await setValue(fixture, '#lastName', 'Leary1');
    expect(fixture.nativeElement.textContent).toContain('Last name may only consist of letters');
    expect(submitButton(fixture).disabled).toBe(true);
  });

  it('should add the vet with the selected specialty and go back to the list', async () => {
    await setValue(fixture, '#firstName', 'Helen');
    await setValue(fixture, '#lastName', 'Leary');
    await setValue(fixture, '#specialties', '2');

    await submitForm(fixture);

    expect(vetService.addVet).toHaveBeenCalledWith({id: null, firstName: 'Helen', lastName: 'Leary', specialties: [surgery]});
    expect(router.navigate).toHaveBeenCalledWith(['/vets']);
  });

  it('should add the vet without specialty when none is selected', async () => {
    await setValue(fixture, '#firstName', 'Helen');
    await setValue(fixture, '#lastName', 'Leary');

    await submitForm(fixture);

    expect(vetService.addVet).toHaveBeenCalledWith({id: null, firstName: 'Helen', lastName: 'Leary', specialties: []});
  });
});
