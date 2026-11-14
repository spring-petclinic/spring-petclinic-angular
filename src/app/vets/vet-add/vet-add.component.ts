/*
 *
 *  * Copyright 2016-2018 the original author or authors.
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

/**
 * @author Vitaliy Fedoriv
 */

import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {Specialty} from '../../specialties/specialty';
import {SpecialtyService} from 'app/specialties/specialty.service';
import {Vet} from '../vet';
import {Router} from '@angular/router';
import { form, FormRoot, FormField } from '@angular/forms/signals';
import {firstValueFrom} from 'rxjs';
import {vetNamesSchema} from '../vet-form';
import {VetService} from '../vet.service';
import {resourceErrorMessage, valueOrDefault} from '../../utils/resource-utils';

@Component({
    selector: 'app-vet-add',
    templateUrl: './vet-add.component.html',
    styleUrls: ['./vet-add.component.css'],
    imports: [FormRoot, FormField]
})
export class VetAddComponent {
  private specialtyService = inject(SpecialtyService);
  private vetService = inject(VetService);
  private router = inject(Router);

  private readonly specialtiesResource = rxResource({
    stream: () => this.specialtyService.getSpecialties(),
  });

  // the specialty is the id of the selected one, as the native select only handles strings
  private readonly vet = signal({ firstName: '', lastName: '', specialtyId: '' });
  readonly specialtiesList = computed(() => valueOrDefault(this.specialtiesResource, [] as Specialty[]));
  private readonly submitError = signal<string | null>(null);
  readonly errorMessage = computed(
    () => this.submitError() ?? resourceErrorMessage(this.specialtiesResource)
  );

  protected readonly vetForm = form(this.vet, vetNamesSchema(1), {
    submission: {
      action: async () => {
        const { firstName, lastName, specialtyId } = this.vet();
        const specialty = this.specialtiesList().find(spec => String(spec.id) === specialtyId);
        const vet = { id: null, firstName, lastName, specialties: specialty ? [specialty] : [] } as Vet;
        try {
          await firstValueFrom(this.vetService.addVet(vet));
          this.gotoVetList();
        } catch (error) {
          this.submitError.set(String(error));
        }
        return undefined;
      }
    }
  });

  gotoVetList() {
    this.router.navigate(['/vets']);
  }
}
