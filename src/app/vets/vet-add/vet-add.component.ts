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
import {VetService} from '../vet.service';
import {resourceErrorMessage, valueOrDefault} from '../../resource-utils';

@Component({
  selector: 'app-vet-add',
  standalone: false,
  templateUrl: './vet-add.component.html',
  styleUrls: ['./vet-add.component.css']
})
export class VetAddComponent {
  private specialtyService = inject(SpecialtyService);
  private vetService = inject(VetService);
  private router = inject(Router);

  private readonly specialtiesResource = rxResource({
    stream: () => this.specialtyService.getSpecialties(),
  });

  // the form fields are bound to the properties of these objects with ngModel
  vet = {} as Vet;
  selectedSpecialty = {} as Specialty;
  readonly specialtiesList = computed(() => valueOrDefault(this.specialtiesResource, [] as Specialty[]));
  private readonly submitError = signal<string | null>(null);
  readonly errorMessage = computed(
    () => this.submitError() ?? resourceErrorMessage(this.specialtiesResource)
  );

  onSubmit(vet: Vet) {
    vet.id = null;
    vet.specialties = [];
    if (this.selectedSpecialty.id !== undefined) {
      vet.specialties.push(this.selectedSpecialty);
    }
    this.vetService.addVet(vet).subscribe({
      next: () => this.gotoVetList(),
      error: error => this.submitError.set(String(error))
    });
  }

  gotoVetList() {
    this.router.navigate(['/vets']);
  }
}
