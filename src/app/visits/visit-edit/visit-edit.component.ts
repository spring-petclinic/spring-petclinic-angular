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
import {Pet} from '../../pets/pet';
import {Owner} from '../../owners/owner';
import {PetType} from '../../pettypes/pettype';
import {VisitService} from '../visit.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-visit-edit',
  templateUrl: './visit-edit.component.html',
  styleUrls: ['./visit-edit.component.css']
})
export class VisitEditComponent implements OnInit {
  visit: Visit;
  current_pet: Pet;
  current_owner: Owner;
  current_pet_type: PetType;
  update_success: boolean = false;
  errorMessage: string;

  constructor(private visitService: VisitService, private route: ActivatedRoute, private router: Router) {
    this.visit = <Visit>{};
    this.current_pet = <Pet>{};
    this.current_owner = <Owner>{};
    this.current_pet_type = <PetType>{};
  }

  ngOnInit() {
    const visitId = this.route.snapshot.params['id'];
    this.visitService.getVisitById(visitId).subscribe(
      response => {
        this.visit = response;
        this.current_pet = this.visit.pet;
        this.current_pet_type = this.current_pet.type;
        this.current_owner = this.current_pet.owner;
      },
      error => this.errorMessage = <any> error);
  }

  onSubmit(visit: Visit) {
    visit.pet = this.current_pet;
    var that = this;
    // format output from datepicker to short string yyyy/mm/dd format, and timezone correct
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var visit_date_as_time = new Date(visit.date).getTime();
    visit.date = new Date(visit_date_as_time - tzoffset).toISOString().substring(0, 10).replace(/-/g, '/');
    this.visitService.updateVisit(visit.id.toString(), visit).subscribe(
      get_result,
      error => this.errorMessage = <any> error);
    function get_result(update_status) {
      if (update_status.status === 204) {
        console.log('update success');
        that.gotoOwnerDetail();
      } else {
        return console.log('update failed');
      }
    }

  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.current_owner.id]);
  }

}
