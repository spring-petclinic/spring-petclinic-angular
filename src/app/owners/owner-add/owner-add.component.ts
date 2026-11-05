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

import { Component, inject, signal } from '@angular/core';
import {OwnerService} from '../owner.service';
import {Owner} from '../owner';
import {Router} from '@angular/router';
import { form, FormRoot, FormField } from '@angular/forms/signals';
import {firstValueFrom} from 'rxjs';
import {emptyOwnerForm, ownerSchema} from '../owner-form';

@Component({
    selector: 'app-owner-add',
    templateUrl: './owner-add.component.html',
    styleUrls: ['./owner-add.component.css'],
    imports: [FormRoot, FormField]
})
export class OwnerAddComponent {
  private ownerService = inject(OwnerService);
  private router = inject(Router);

  private readonly owner = signal(emptyOwnerForm());
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly ownerForm = form(this.owner, ownerSchema, {
    submission: {
      action: async () => {
        try {
          await firstValueFrom(this.ownerService.addOwner({id: null, ...this.owner()} as Owner));
          this.gotoOwnersList();
        } catch (error) {
          this.errorMessage.set(String(error));
        }
        return undefined;
      }
    }
  });

  gotoOwnersList() {
    this.router.navigate(['/owners']);
  }

}
