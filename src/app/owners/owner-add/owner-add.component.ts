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
import {OwnerService} from '../owner.service';
import {Owner} from '../owner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-owner-add',
  templateUrl: './owner-add.component.html',
  styleUrls: ['./owner-add.component.css']
})
export class OwnerAddComponent implements OnInit {

  owner: Owner;
  errorMessage: string;

  constructor(private ownerService: OwnerService, private router: Router) {
    this.owner = <Owner>{};
  }

  ngOnInit() {
  }

  onSubmit(owner: Owner) {
    owner.id = null;
    this.ownerService.addOwner(owner).subscribe(
      new_owner => {
        this.owner = new_owner;
        this.gotoOwnersList();
      },
      error => this.errorMessage = <any>error
    );
  }

  gotoOwnersList() {
    this.router.navigate(['/owners']);
  }

}
