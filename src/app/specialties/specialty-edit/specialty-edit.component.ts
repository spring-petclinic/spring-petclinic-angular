/*
 *
 *  * Copyright 2017-2018 the original author or authors.
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

import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {Specialty} from '../specialty';
import {SpecialtyService} from '../specialty.service';
import {Router} from '@angular/router';
import {resourceErrorMessage, valueOrDefault} from '../../resource-utils';

@Component({
  selector: 'app-specialty-edit',
  standalone: false,
  templateUrl: './specialty-edit.component.html',
  styleUrls: ['./specialty-edit.component.css']
})
export class SpecialtyEditComponent {
  private specialtyService = inject(SpecialtyService);
  private router = inject(Router);

  // route parameter, bound by the router (bindToComponentInputs)
  readonly id = input<string>();

  private readonly specialtyResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.specialtyService.getSpecialtyById(params),
  });

  private readonly emptySpecialty = {} as Specialty;

  // working copy bound to the form fields with ngModel: the loaded specialty is never mutated
  protected readonly specialty = linkedSignal(() => ({ ...valueOrDefault(this.specialtyResource, this.emptySpecialty) }));

  private readonly submitError = signal<string | null>(null);
  protected readonly errorMessage = computed(
    () => this.submitError() ?? resourceErrorMessage(this.specialtyResource)
  );

  onSubmit(specialty: Specialty) {
    this.specialtyService.updateSpecialty(specialty.id.toString(), specialty).subscribe({
      next: () => this.onBack(),
      error: error => this.submitError.set(String(error))
    });
  }

  onBack() {
    this.router.navigate(['/specialties']);
  }

}
