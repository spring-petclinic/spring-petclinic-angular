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


/**
 * @author Vitaliy Fedoriv
 */

import { Component, inject, input, signal } from '@angular/core';
import {Router} from '@angular/router';
import {PetService} from '../pet.service';
import {Pet} from '../pet';
import { VisitListComponent } from '../../visits/visit-list/visit-list.component';

@Component({
    selector: 'app-pet-list',
    templateUrl: './pet-list.component.html',
    styleUrls: ['./pet-list.component.css'],
    imports: [VisitListComponent]
})
export class PetListComponent {
  private router = inject(Router);
  private petService = inject(PetService);

  readonly pet = input.required<Pet>();
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly deleteSuccess = signal(false);

  editPet(pet: Pet) {
    this.router.navigate(['/pets', pet.id, 'edit']);
  }

  deletePet(pet: Pet) {
    this.petService.deletePet(pet.id.toString()).subscribe({
      next: () => this.deleteSuccess.set(true),
      error: (error) => this.errorMessage.set(String(error))
    });
  }

  addVisit(pet: Pet) {
    this.router.navigate(['/pets', pet.id, 'visits', 'add']);
  }

}
