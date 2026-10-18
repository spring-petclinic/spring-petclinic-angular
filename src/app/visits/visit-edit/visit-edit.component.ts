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
import {resourceErrorMessage, valueOrDefault} from '../../resource-utils';

import moment from 'moment';
import {OwnerService} from '../../owners/owner.service';
import {PetService} from '../../pets/pet.service';

@Component({
  selector: 'app-visit-edit',
  standalone: false,
  templateUrl: './visit-edit.component.html',
  styleUrls: ['./visit-edit.component.css']
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

  // working copy bound to the form fields with ngModel: the loaded visit is never mutated
  readonly visit = linkedSignal(() => ({ ...valueOrDefault(this.visitResource, this.emptyVisit) }));
  readonly currentPet = computed(() => valueOrDefault(this.petResource, this.emptyPet));
  readonly currentOwner = computed(() => valueOrDefault(this.ownerResource, this.emptyOwner));
  readonly updateSuccess = signal(false);
  private readonly submitError = signal<string | null>(null);
  readonly errorMessage = computed(
    () => this.submitError() ?? resourceErrorMessage(this.visitResource)
  );

  onSubmit(visit: Visit) {
    visit.pet = this.currentPet();

    // format output from datepicker to short string yyyy-mm-dd format (rfc3339)
    visit.date = moment(visit.date).format('YYYY-MM-DD');

    this.visitService.updateVisit(visit.id.toString(), visit).subscribe({
      next: () => this.gotoOwnerDetail(),
      error: error => this.submitError.set(String(error))
    });
  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.currentOwner().id]);
  }

}
