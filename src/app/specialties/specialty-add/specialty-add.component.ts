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

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Specialty} from '../specialty';
import * as moment from "moment";
import {SpecialtyService} from "../specialty.service";

@Component({
  selector: 'app-specialty-add',
  templateUrl: './specialty-add.component.html',
  styleUrls: ['./specialty-add.component.css']
})
export class SpecialtyAddComponent implements OnInit {
  specialty: Specialty;
  added_success: boolean = false;
  errorMessage: string;
  @Output() onNew = new EventEmitter<Specialty>();

  constructor(private specialtyService : SpecialtyService) {
    this.specialty = <Specialty>{};
  }

  ngOnInit() {
  }

  onSubmit(specialty: Specialty) {
    specialty.id = null;
    this.specialtyService.addSpecialty(specialty).subscribe(
      new_specialty => {
        this.specialty = new_specialty;
        this.added_success = true;
        this.onNew.emit(this.specialty) ;
      },
      error => this.errorMessage = <any>error
    );
}


}
