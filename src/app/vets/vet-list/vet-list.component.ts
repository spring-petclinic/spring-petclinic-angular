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

import {Component, computed, inject, linkedSignal, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {Vet} from '../vet';
import {VetService} from '../vet.service';
import {Router} from '@angular/router';
import {resourceErrorMessage, valueOrDefault} from '../../utils/resource-utils';

@Component({
  selector: 'app-vet-list',
  standalone: false,
  templateUrl: './vet-list.component.html',
  styleUrls: ['./vet-list.component.css']
})
export class VetListComponent {
  private vetService = inject(VetService);
  private router = inject(Router);

  private readonly vetsResource = rxResource({
    stream: () => this.vetService.getVets(),
  });

  // local copy so that deleted vets disappear without reloading the list
  readonly vets = linkedSignal(() => valueOrDefault(this.vetsResource, [] as Vet[]));
  readonly isVetDataReceived = computed(() => !this.vetsResource.isLoading());

  private readonly deleteError = signal<string | null>(null);
  readonly errorMessage = computed(() => this.deleteError() ?? resourceErrorMessage(this.vetsResource));

  deleteVet(vet: Vet) {
    this.vetService.deleteVet(vet.id).subscribe({
      next: () => this.vets.update(vets => vets.filter(currentItem => currentItem.id !== vet.id)),
      error: error => this.deleteError.set(String(error))
    });
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }

  addVet() {
    this.router.navigate(['/vets/add']);
  }

  editVet(vet: Vet) {
    this.router.navigate(['/vets', vet.id, 'edit']);
  }
}
