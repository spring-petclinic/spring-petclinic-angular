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

import {Component, computed, inject, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {OwnerService} from '../owner.service';
import {Owner} from '../owner';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { form, maxLength, FormRoot, FormField } from '@angular/forms/signals';

@Component({
    selector: 'app-owner-list',
    templateUrl: './owner-list.component.html',
    styleUrls: ['./owner-list.component.css'],
    imports: [FormRoot, FormField, RouterLinkActive, RouterLink]
})
export class OwnerListComponent {
  private router = inject(Router);
  private ownerService = inject(OwnerService);

  private readonly search = signal({lastName: ''});
  // search term applied by the "Find Owner" button: changing it reloads the owners
  private readonly searchTerm = signal('');

  private readonly ownersResource = rxResource({
    params: () => this.searchTerm(),
    stream: ({params}) => params === ''
      ? this.ownerService.getOwners()
      : this.ownerService.searchOwners(params)
  });

  protected readonly searchForm = form(this.search, path => maxLength(path.lastName, 80), {
    submission: {
      action: async () => {
        this.searchByLastName(this.search().lastName);
        return undefined;
      }
    }
  });

  protected readonly owners = computed(() =>
    this.ownersResource.hasValue() ? this.ownersResource.value() : null);
  protected readonly isOwnersDataReceived = computed(() => !this.ownersResource.isLoading());

  onSelect(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }

  addOwner() {
    this.router.navigate(['/owners/add']);
  }

  searchByLastName(lastName: string) {
    if (lastName === this.searchTerm()) {
      this.ownersResource.reload();
    } else {
      this.searchTerm.set(lastName);
    }
  }
}
