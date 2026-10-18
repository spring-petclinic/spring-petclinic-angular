/*
 *
 *  * Copyright 2016-2017 the original author or authors.
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

import { Component, inject, output, signal } from '@angular/core';
import { Specialty } from '../specialty';
import { SpecialtyService } from '../specialty.service';

@Component({
  selector: 'app-specialty-add',
  standalone: false,
  templateUrl: './specialty-add.component.html',
  styleUrls: ['./specialty-add.component.css'],
})
export class SpecialtyAddComponent {
  private specialtyService = inject(SpecialtyService);

  // the form fields are bound to the properties of this object with ngModel
  speciality = {} as Specialty;
  readonly addedSuccess = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly newSpeciality = output<Specialty>();

  onSubmit(specialty: Specialty) {
    this.specialtyService.addSpecialty(specialty).subscribe({
      next: (newSpecialty) => {
        this.addedSuccess.set(true);
        this.newSpeciality.emit(newSpecialty);
      },
      error: (error) => this.errorMessage.set(String(error)),
    });
  }
}
