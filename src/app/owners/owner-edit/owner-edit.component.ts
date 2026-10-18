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

import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { OwnerService } from '../owner.service';
import { Owner } from '../owner';
import { Router } from '@angular/router';
import { resourceErrorMessage, valueOrDefault } from '../../resource-utils';

@Component({
  selector: 'app-owner-edit',
  standalone: false,
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css'],
})
export class OwnerEditComponent {
  private ownerService = inject(OwnerService);
  private router = inject(Router);

  // route parameter, bound by the router (bindToComponentInputs)
  readonly id = input<string>();

  private readonly ownerResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.ownerService.getOwnerById(Number(params)),
  });

  private readonly emptyOwner = {} as Owner;

  // working copy bound to the form fields with ngModel: the loaded owner is never mutated
  protected readonly owner = linkedSignal(() => ({ ...valueOrDefault(this.ownerResource, this.emptyOwner) }));

  private readonly submitError = signal<string | null>(null);
  protected readonly errorMessage = computed(
    () => this.submitError() ?? resourceErrorMessage(this.ownerResource)
  );

  onSubmit(owner: Owner) {
    this.ownerService.updateOwner(this.id(), owner).subscribe({
      next: () => this.gotoOwnerDetail(owner),
      error: (error) => this.submitError.set(String(error)),
    });
  }

  gotoOwnerDetail(owner: Owner) {
    this.submitError.set(null);
    this.router.navigate(['/owners', owner.id]);
  }
}
