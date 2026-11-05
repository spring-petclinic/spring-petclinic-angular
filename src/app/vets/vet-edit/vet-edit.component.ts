/*
 *
 *  * Copyright 2016-2018 the original author or authors.
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

import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import {Vet} from '../vet';
import {VetService} from '../vet.service';
import {Router} from '@angular/router';
import {Specialty} from '../../specialties/specialty';
import {form} from '@angular/forms/signals';
import {firstValueFrom} from 'rxjs';
import {vetNamesSchema} from '../vet-form';

@Component({
  selector: 'app-vet-edit',
  standalone: false,
  templateUrl: './vet-edit.component.html',
  styleUrls: ['./vet-edit.component.css']
})
export class VetEditComponent {
  private vetService = inject(VetService);
  private router = inject(Router);

  // data of the route resolvers (VetResolver and SpecResolver), bound by the router (bindToComponentInputs)
  readonly vet = input<Vet>();
  readonly specs = input<Specialty[]>([]);

  readonly errorMessage = signal<string | null>(null);

  // working copy edited through the signal form: the resolved vet is never mutated
  private readonly vetModel = linkedSignal(() => {
    const { firstName = '', lastName = '', specialties = [] } = this.vet() ?? {};
    return { firstName, lastName, specialties: [...specialties] };
  });

  protected readonly vetForm = form(this.vetModel, vetNamesSchema(2), {
    submission: {
      action: async () => {
        const vet = { id: this.vet().id, ...this.vetModel() } as Vet;
        try {
          await firstValueFrom(this.vetService.updateVet(vet.id, vet));
          this.gotoVetList();
        } catch (error) {
          this.errorMessage.set(String(error));
        }
        return undefined;
      }
    }
  });

  compareSpecFn(c1: Specialty, c2: Specialty): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  gotoVetList() {
    this.router.navigate(['/vets']);
  }

}
