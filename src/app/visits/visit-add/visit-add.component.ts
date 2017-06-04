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

import {Component, OnInit} from '@angular/core';
import {Visit} from '../visit';
import {VisitService} from '../visit.service';
import {Router, ActivatedRoute} from '@angular/router';
import {PetService} from '../../pets/pet.service';
import {Pet} from '../../pets/pet';
import {PetType} from '../../pettypes/pettype';
import {Owner} from '../../owners/owner';


@Component({
  selector: 'app-visit-add',
  templateUrl: './visit-add.component.html',
  styleUrls: ['./visit-add.component.css']
})
export class VisitAddComponent implements OnInit {

  visit: Visit;
  current_pet: Pet;
  current_owner: Owner;
  current_pet_type: PetType;
  added_success: boolean = false;
  errorMessage: string;

  constructor(private visitService: VisitService, private petService: PetService, private router: Router, private route: ActivatedRoute) {
    this.visit = <Visit>{};
    this.current_pet = <Pet>{};
    this.current_owner = <Owner>{};
    this.current_pet_type = <PetType>{};

  }

  ngOnInit() {
    console.log(this.route.parent);
    const petId = this.route.snapshot.params['id'];
    this.petService.getPetById(petId).subscribe(
      response => {
        this.current_pet = response;
        this.visit.pet = this.current_pet;
        this.current_pet_type = this.current_pet.type;
        this.current_owner = this.current_pet.owner;
      },
      error => this.errorMessage = <any> error);
  }

  onSubmit(visit: Visit) {
    visit.id = null;
    var that = this;
    // format output from datepicker to short string yyyy/mm/dd format
    visit.date = new Date(visit.date).toISOString().substring(0, 10).replace(/-/g, '/');
    this.visitService.addVisit(visit).subscribe(
      new_visit => {
        this.visit = new_visit;
        this.added_success = true;
        that.gotoOwnerDetail();
      },
      error => this.errorMessage = <any>error
    );
  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.current_owner.id]);
  }

}
