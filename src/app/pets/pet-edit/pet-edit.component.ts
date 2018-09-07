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

import {Component, OnInit, Input} from '@angular/core';
import {Pet} from '../pet';
import {PetService} from '../pet.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Owner} from '../../owners/owner';
import {PetType} from '../../pettypes/pettype';
import {PetTypeService} from '../../pettypes/pettype.service';

import * as moment from 'moment';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
})
export class PetEditComponent implements OnInit {
  pet: Pet;
  @Input() current_type: PetType;
  current_owner: Owner;
  pet_types: PetType[];
  errorMessage: string;

  constructor(private petService: PetService, private petTypeService: PetTypeService, private router: Router, private route: ActivatedRoute) {
    this.pet = <Pet>{};
    this.current_owner = <Owner>{};
    this.current_type = <PetType>{};
    this.pet_types = [];
  }

  ngOnInit() {

    this.petTypeService.getPetTypes().subscribe(
      pettypes => this.pet_types = pettypes,
      error => this.errorMessage = <any> error);

    const petId = this.route.snapshot.params['id'];
    this.petService.getPetById(petId).subscribe(
      pet => {
        this.pet = pet;
        this.current_owner = this.pet.owner;
        this.current_type = this.pet.type;
      },
      error => this.errorMessage = <any> error);

  }

  onSubmit(pet: Pet) {
    pet.type = this.current_type;
    var that = this;
    // format output from datepicker to short string yyyy/mm/dd format
    pet.birthDate = moment(pet.birthDate).format('YYYY/MM/DD');

    this.petService.updatePet(pet.id.toString(), pet).subscribe(
      res => this.gotoOwnerDetail(this.current_owner),
      error => this.errorMessage = <any> error
    );
  }

  gotoOwnerDetail(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }

}
