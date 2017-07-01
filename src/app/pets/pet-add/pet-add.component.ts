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
import {PetType} from '../../pettypes/pettype';
import {Owner} from '../../owners/owner';
import {ActivatedRoute, Router} from '@angular/router';
import {PetTypeService} from '../../pettypes/pettype.service';
import {PetService} from '../pet.service';
import {OwnerService} from '../../owners/owner.service';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.css']
})
export class PetAddComponent implements OnInit {
  pet: Pet;
  @Input() current_type: PetType;
  current_owner: Owner;
  pet_types: PetType[];
  added_success: boolean = false;
  errorMessage: string;

  constructor(private ownerService: OwnerService, private petService: PetService,
              private petTypeService: PetTypeService, private router: Router, private route: ActivatedRoute) {
    this.pet = <Pet>{};
    this.current_owner = <Owner>{};
    this.current_type = <PetType>{};
    this.pet_types = [];
  }

  ngOnInit() {
    this.petTypeService.getPetTypes().subscribe(
      pettypes => this.pet_types = pettypes,
      error => this.errorMessage = <any> error);

    const ownerId = this.route.snapshot.params['id'];
    this.ownerService.getOwnerById(ownerId).subscribe(
      response => {
        this.current_owner = response;
      },
      error => this.errorMessage = <any> error);
  }

  onSubmit(pet: Pet) {
    pet.id = null;
    pet.owner = this.current_owner;
    // format output from datepicker to short string yyyy/mm/dd format
    pet.birthDate = new Date(pet.birthDate).toISOString().substring(0, 10).replace(/-/g, '/');
    this.petService.addPet(pet).subscribe(
      new_pet => {
        this.pet = new_pet;
        this.added_success = true;
      },
      error => this.errorMessage = <any>error);
  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.current_owner.id]);
  }

}
