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

import { Component, effect, inject, input, signal } from '@angular/core';
import {Vet} from '../vet';
import {VetService} from '../vet.service';
import {Router} from '@angular/router';
import {Specialty} from '../../specialties/specialty';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-vet-edit',
  standalone: false,
  templateUrl: './vet-edit.component.html',
  styleUrls: ['./vet-edit.component.css']
})
export class VetEditComponent {
  private formBuilder = inject(FormBuilder);
  private vetService = inject(VetService);
  private router = inject(Router);

  // data of the route resolvers (VetResolver and SpecResolver), bound by the router (bindToComponentInputs)
  readonly vet = input<Vet>();
  readonly specs = input<Specialty[]>([]);

  vetEditForm: FormGroup;
  idCtrl: FormControl;
  firstNameCtrl: FormControl;
  lastNameCtrl: FormControl;
  specialtiesCtrl: FormControl;

  readonly errorMessage = signal<string | null>(null);

  constructor() {
    this.buildForm();
    // the reactive form is not signal based: keep it in sync with the resolved vet
    effect(() => this.initFormValues(this.vet()));
  }

  buildForm() {
    this.idCtrl = new FormControl(null);
    this.firstNameCtrl = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.lastNameCtrl = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.specialtiesCtrl = new FormControl(null);
    this.vetEditForm = this.formBuilder.group({
      id: this.idCtrl,
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      specialties: this.specialtiesCtrl
    });
  }

  compareSpecFn(c1: Specialty, c2: Specialty): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  initFormValues(vet: Vet | undefined) {
    if (!vet) {
      return;
    }
    this.idCtrl.setValue(vet.id);
    this.firstNameCtrl.setValue(vet.firstName);
    this.lastNameCtrl.setValue(vet.lastName);
    this.specialtiesCtrl.setValue(vet.specialties);
  }

  onSubmit(vet: Vet) {
    this.vetService.updateVet(vet.id.toString(), vet).subscribe({
      next: () => this.gotoVetList(),
      error: error => this.errorMessage.set(String(error))
    });
  }

  gotoVetList() {
    this.router.navigate(['/vets']);
  }

}
