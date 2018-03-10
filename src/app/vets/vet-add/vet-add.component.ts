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

import {Component, OnInit} from '@angular/core';
import {Specialty} from '../../specialties/specialty';
import {SpecialtyService} from 'app/specialties/specialty.service';
import {Vet} from '../vet';
import {Router} from '@angular/router';
import {VetService} from '../vet.service';

@Component({
  selector: 'app-vet-add',
  templateUrl: './vet-add.component.html',
  styleUrls: ['./vet-add.component.css']
})
export class VetAddComponent implements OnInit {
  vet: Vet;
  specialties_list: Specialty[];
  selected_specialty: Specialty;
  errorMessage: string;

  constructor(private specialtyService: SpecialtyService, private vetService: VetService, private router: Router) {
    this.vet = <Vet>{};
    this.selected_specialty = <Specialty>{};
    this.specialties_list = [];
  }

  ngOnInit() {
    this.specialtyService.getSpecialties().subscribe(
      specialties => this.specialties_list = specialties,
      error => this.errorMessage = <any>error
    );
  }

  onSubmit(vet: Vet){
    vet.id = null;
    vet.specialties = [];
    if (this.selected_specialty.id !== undefined) {
      vet.specialties.push(this.selected_specialty);
    }
    this.vetService.addVet(vet).subscribe(
      new_vet => {
        this.vet = new_vet;
        this.gotoVetList();
      },
      error => this.errorMessage = <any>error
    );
  }

  gotoVetList() {
    this.router.navigate(['/vets']);
  }
}
