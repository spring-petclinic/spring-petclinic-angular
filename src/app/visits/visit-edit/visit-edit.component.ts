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
import {Visit} from '../visit';
import {Pet} from '../../pets/pet';
import {Owner} from '../../owners/owner';
import {VisitService} from '../visit.service';
import {Router} from '@angular/router';
import { form, FormRoot, FormField } from '@angular/forms/signals';
import {firstValueFrom} from 'rxjs';
import {VisitFormModel, visitSchema} from '../visit-form';
import {resourceErrorMessage, valueOrDefault} from '../../utils/resource-utils';

import moment from 'moment';
import {OwnerService} from '../../owners/owner.service';
import {PetService} from '../../pets/pet.service';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';

@Component({
    selector: 'app-visit-edit',
    templateUrl: './visit-edit.component.html',
    styleUrls: ['./visit-edit.component.css'],
    imports: [FormRoot, MatDatepickerInput, FormField, MatDatepickerToggle, MatDatepicker]
})
export class VisitEditComponent {
  private visitService = inject(VisitService);
  private petService = inject(PetService);
  private ownerService = inject(OwnerService);
  private router = inject(Router);

  // route parameter, bound by the router (bindToComponentInputs)
  readonly id = input<string>();

  private readonly visitResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.visitService.getVisitById(params),
  });
  // each level is loaded once the previous one, which references it, has been received
  private readonly petResource = rxResource({
    params: () => (this.visitResource.hasValue() ? this.visitResource.value().petId : undefined),
    stream: ({ params }) => this.petService.getPetById(params),
  });
  private readonly ownerResource = rxResource({
    params: () => (this.petResource.hasValue() ? this.petResource.value().ownerId : undefined),
    stream: ({ params }) => this.ownerService.getOwnerById(params),
  });

  private readonly emptyVisit = {} as Visit;
  private readonly emptyPet = {} as Pet;
  private readonly emptyOwner = {} as Owner;

  private readonly loadedVisit = computed(() => valueOrDefault(this.visitResource, this.emptyVisit));
  // working copy edited through the signal form: the loaded visit is never mutated
  private readonly visit = linkedSignal<VisitFormModel>(() => {
    const { date = null, description = '' } = this.loadedVisit();
    return { date, description };
  });
  readonly currentPet = computed(() => valueOrDefault(this.petResource, this.emptyPet));
  readonly currentOwner = computed(() => valueOrDefault(this.ownerResource, this.emptyOwner));
  readonly updateSuccess = signal(false);
  private readonly submitError = signal<string | null>(null);
  readonly errorMessage = computed(
    () => this.submitError() ?? resourceErrorMessage(this.visitResource)
  );

  protected readonly visitForm = form(this.visit, visitSchema, {
    submission: {
      action: async () => {
        const { date, description } = this.visit();
        const visit = {
          id: this.loadedVisit().id,
          pet: this.currentPet(),
          // format output from datepicker to short string yyyy-mm-dd format (rfc3339)
          date: moment(date).format('YYYY-MM-DD'),
          description
        } as Visit;
        try {
          await firstValueFrom(this.visitService.updateVisit(visit.id.toString(), visit));
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
