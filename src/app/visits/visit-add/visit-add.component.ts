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
import {Visit} from '../visit';
import {VisitService} from '../visit.service';
import {Router} from '@angular/router';
import {form} from '@angular/forms/signals';
import {firstValueFrom} from 'rxjs';
import {VisitFormModel, visitSchema} from '../visit-form';
import {resourceErrorMessage, valueOrDefault} from '../../utils/resource-utils';
import {PetService} from '../../pets/pet.service';
import {Pet} from '../../pets/pet';
import {Owner} from '../../owners/owner';

import moment from 'moment';
import {OwnerService} from '../../owners/owner.service';

@Component({
  selector: 'app-visit-add',
  standalone: false,
  templateUrl: './visit-add.component.html',
  styleUrls: ['./visit-add.component.css']
})
export class VisitAddComponent {
  private visitService = inject(VisitService);
  private petService = inject(PetService);
  private ownerService = inject(OwnerService);
  private router = inject(Router);

  // pet id: route parameter, bound by the router (bindToComponentInputs)
  readonly id = input<string>();

  private readonly petResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.petService.getPetById(Number(params)),
  });
  // the owner is loaded once the pet, which references it, has been received
  private readonly ownerResource = rxResource({
    params: () => (this.petResource.hasValue() ? this.petResource.value().ownerId : undefined),
    stream: ({ params }) => this.ownerService.getOwnerById(params),
  });

  private readonly emptyPet = {} as Pet;
  private readonly emptyOwner = {} as Owner;

  private readonly visit = signal<VisitFormModel>({ date: null, description: '' });
  readonly currentPet = computed(() => valueOrDefault(this.petResource, this.emptyPet));
  readonly currentOwner = computed(() => valueOrDefault(this.ownerResource, this.emptyOwner));
  readonly addedSuccess = signal(false);
  private readonly submitError = signal<string | null>(null);
  readonly errorMessage = computed(
    () => this.submitError() ?? resourceErrorMessage(this.petResource)
  );

  protected readonly visitForm = form(this.visit, visitSchema, {
    submission: {
      action: async () => {
        const { date, description } = this.visit();
        const visit = {
          id: null,
          pet: this.currentPet(),
          // format output from datepicker to short string yyyy-mm-dd format (rfc3339)
          date: moment(date).format('YYYY-MM-DD'),
          description
        } as Visit;
        try {
          await firstValueFrom(this.visitService.addVisit(visit));
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
