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

import {Component, computed, inject, linkedSignal, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {Specialty} from '../specialty';
import {SpecialtyService} from '../specialty.service';
import {Router} from '@angular/router';
import {resourceErrorMessage, valueOrDefault} from '../../utils/resource-utils';
import { SpecialtyAddComponent } from '../specialty-add/specialty-add.component';

@Component({
    selector: 'app-specialty-list',
    templateUrl: './specialty-list.component.html',
    styleUrls: ['./specialty-list.component.css'],
    imports: [SpecialtyAddComponent]
})
export class SpecialtyListComponent {
  private specService = inject(SpecialtyService);
  private router = inject(Router);

  private readonly specialtiesResource = rxResource({
    stream: () => this.specService.getSpecialties(),
  });

  // local copy so that added and deleted specialties appear without reloading the list
  readonly specialties = linkedSignal(() => valueOrDefault(this.specialtiesResource, [] as Specialty[]));
  readonly isSpecialitiesDataReceived = computed(() => !this.specialtiesResource.isLoading());
  readonly isInsert = signal(false);

  private readonly deleteError = signal<string | null>(null);
  readonly errorMessage = computed(() => this.deleteError() ?? resourceErrorMessage(this.specialtiesResource));

  deleteSpecialty(specialty: Specialty) {
    this.specService.deleteSpecialty(specialty.id.toString()).subscribe({
      next: () => this.specialties.update(specialties => specialties.filter(currentItem => currentItem.id !== specialty.id)),
      error: error => this.deleteError.set(String(error))
    });
  }

  onNewSpecialty(newSpecialty: Specialty) {
    this.specialties.update(specialties => [...specialties, newSpecialty]);
    this.showAddSpecialtyComponent();
  }

  showAddSpecialtyComponent() {
    this.isInsert.update(isInsert => !isInsert);
  }

  showEditSpecialtyComponent(updatedSpecialty: Specialty) {
    this.router.navigate(['/specialties', updatedSpecialty.id.toString(), 'edit']);
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }

}
