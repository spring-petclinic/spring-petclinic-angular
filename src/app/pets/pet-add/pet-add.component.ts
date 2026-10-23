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


import { Component, computed, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {Pet} from '../pet';
import {PetType} from '../../pettypes/pettype';
import {Owner} from '../../owners/owner';
import {Router} from '@angular/router';
import {form} from '@angular/forms/signals';
import {firstValueFrom} from 'rxjs';
import {petSchema, PetFormModel} from '../pet-form';
import {resourceErrorMessage, valueOrDefault} from '../../utils/resource-utils';
import {PetTypeService} from '../../pettypes/pettype.service';
import {PetService} from '../pet.service';
import {OwnerService} from '../../owners/owner.service';

import moment from 'moment';

@Component({
  selector: 'app-pet-add',
  standalone: false,
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.css']
})
export class PetAddComponent {
  private ownerService = inject(OwnerService);
  private petService = inject(PetService);
  private petTypeService = inject(PetTypeService);
  private router = inject(Router);

  // owner id: route parameter, bound by the router (bindToComponentInputs)
  readonly id = input<string>();

  private readonly petTypesResource = rxResource({
    stream: () => this.petTypeService.getPetTypes(),
  });
  private readonly ownerResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.ownerService.getOwnerById(Number(params)),
  });

  private readonly emptyOwner = {} as Owner;

  private readonly pet = signal<PetFormModel>({ name: '', birthDate: null, typeId: '' });
  readonly petTypes = computed(() => valueOrDefault(this.petTypesResource, [] as PetType[]));
  readonly currentOwner = computed(() => valueOrDefault(this.ownerResource, this.emptyOwner));
  readonly addedSuccess = signal(false);
  private readonly submitError = signal<string | null>(null);
  readonly errorMessage = computed(
    () => this.submitError() ?? resourceErrorMessage(this.petTypesResource) ?? resourceErrorMessage(this.ownerResource)
  );

  protected readonly petForm = form(this.pet, petSchema, {
    submission: {
      action: async () => {
        const { name, birthDate, typeId } = this.pet();
        const pet = {
          id: null,
          owner: this.currentOwner(),
          name,
          // format output from datepicker to short string yyyy-mm-dd format (rfc3339)
          birthDate: moment(birthDate).format('YYYY-MM-DD'),
          type: this.petTypes().find(petType => String(petType.id) === typeId)
        } as Pet;
        try {
          await firstValueFrom(this.petService.addPet(pet));
          this.addedSuccess.set(true);
          this.gotoOwnerDetail();
        } catch (error) {
          this.submitError.set(String(error));
        }
        return undefined;
      }
    }
  });

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.currentOwner().id]);
  }

}
