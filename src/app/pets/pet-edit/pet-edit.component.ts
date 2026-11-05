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

import { Component, computed, inject, input, linkedSignal, numberAttribute, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {Pet} from '../pet';
import {PetService} from '../pet.service';
import {Router} from '@angular/router';
import {form} from '@angular/forms/signals';
import {firstValueFrom} from 'rxjs';
import {petSchema, PetFormModel} from '../pet-form';
import {resourceErrorMessage, valueOrDefault} from '../../utils/resource-utils';
import {Owner} from '../../owners/owner';
import {PetType} from '../../pettypes/pettype';
import {PetTypeService} from '../../pettypes/pettype.service';

import moment from 'moment';
import {OwnerService} from '../../owners/owner.service';

@Component({
  selector: 'app-pet-edit',
  standalone: false,
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
})
export class PetEditComponent {
  private petService = inject(PetService);
  private petTypeService = inject(PetTypeService);
  private ownerService = inject(OwnerService);
  private router = inject(Router);

  // route parameter, bound by the router (bindToComponentInputs)
  readonly id = input(undefined, { transform: numberAttribute });

  private readonly petTypesResource = rxResource({
    stream: () => this.petTypeService.getPetTypes(),
  });
  private readonly petResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.petService.getPetById(params),
  });
  // the owner is loaded once the pet, which references it, has been received
  private readonly ownerResource = rxResource({
    params: () => (this.petResource.hasValue() ? this.petResource.value().ownerId : undefined),
    stream: ({ params }) => this.ownerService.getOwnerById(params),
  });

  private readonly emptyPet = {} as Pet;
  private readonly emptyOwner = {} as Owner;

  protected readonly pet = computed(() => valueOrDefault(this.petResource, this.emptyPet));
  // working copy edited through the signal form: the loaded pet is never mutated
  private readonly petModel = linkedSignal<PetFormModel>(() => {
    const { name = '', birthDate = null, type } = this.pet();
    return { name, birthDate, typeId: type ? String(type.id) : '' };
  });
  protected readonly petTypes = computed(() => valueOrDefault(this.petTypesResource, [] as PetType[]));
  protected readonly currentOwner = computed(() => valueOrDefault(this.ownerResource, this.emptyOwner));

  private readonly submitError = signal<string | null>(null);
  protected readonly errorMessage = computed(
    () => this.submitError() ?? resourceErrorMessage(this.petTypesResource) ?? resourceErrorMessage(this.petResource)
  );

  protected readonly petForm = form(this.petModel, petSchema, {
    submission: {
      action: async () => {
        const { name, birthDate, typeId } = this.petModel();
        const pet = {
          id: this.pet().id,
          owner: this.pet().owner,
          name,
          // format output from datepicker to short string yyyy-mm-dd format (rfc3339)
          birthDate: moment(birthDate).format('YYYY-MM-DD'),
          type: this.petTypes().find(petType => String(petType.id) === typeId)
        } as Pet;
        try {
          await firstValueFrom(this.petService.updatePet(pet.id, pet));
          this.gotoOwnerDetail(this.currentOwner());
        } catch (error) {
          this.submitError.set(String(error));
        }
        return undefined;
      }
    }
  });

  gotoOwnerDetail(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }

}
