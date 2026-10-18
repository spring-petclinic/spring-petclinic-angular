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
import {PetType} from '../pettype';
import {PetTypeService} from '../pettype.service';
import {Router} from '@angular/router';
import {resourceErrorMessage, valueOrDefault} from '../../resource-utils';

@Component({
  selector: 'app-pettype-edit',
  standalone: false,
  templateUrl: './pettype-edit.component.html',
  styleUrls: ['./pettype-edit.component.css']
})
export class PettypeEditComponent {
  private pettypeService = inject(PetTypeService);
  private router = inject(Router);

  // route parameter, bound by the router (bindToComponentInputs)
  readonly id = input<string>();

  private readonly pettypeResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.pettypeService.getPetTypeById(params),
  });

  private readonly emptyPettype = {} as PetType;

  // working copy bound to the form fields with ngModel: the loaded pet type is never mutated
  protected readonly pettype = linkedSignal(() => ({ ...valueOrDefault(this.pettypeResource, this.emptyPettype) }));

  private readonly submitError = signal<string | null>(null);
  protected readonly errorMessage = computed(
    () => this.submitError() ?? resourceErrorMessage(this.pettypeResource)
  );

  onSubmit(pettype: PetType) {
    this.pettypeService.updatePetType(pettype.id.toString(), pettype).subscribe({
      next: () => this.onBack(),
      error: error => this.submitError.set(String(error))
    });
  }

  onBack() {
    this.router.navigate(['/pettypes']);
  }

}
