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

import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {OwnerService} from '../owner.service';
import {Router} from '@angular/router';
import {resourceErrorMessage, valueOrDefault} from '../../utils/resource-utils';
import {Owner} from '../owner';
import { PetListComponent } from '../../pets/pet-list/pet-list.component';


@Component({
    selector: 'app-owner-detail',
    templateUrl: './owner-detail.component.html',
    styleUrls: ['./owner-detail.component.css'],
    imports: [PetListComponent]
})
export class OwnerDetailComponent {
  private router = inject(Router);
  private ownerService = inject(OwnerService);

  // route parameter, bound by the router (bindToComponentInputs)
  readonly id = input<string>();

  private readonly ownerResource = rxResource({
    params: () => this.id(),
    stream: ({params}) => this.ownerService.getOwnerById(Number(params))
  });

  private readonly emptyOwner = {} as Owner;

  protected readonly owner = computed(() => valueOrDefault(this.ownerResource, this.emptyOwner));
  protected readonly errorMessage = computed(() => resourceErrorMessage(this.ownerResource));

  gotoOwnersList() {
    this.router.navigate(['/owners']);
  }

  editOwner() {
    this.router.navigate(['/owners', this.owner().id, 'edit']);
  }

  addPet(owner: Owner) {
    this.router.navigate(['/owners', owner.id, 'pets', 'add']);
  }
}
