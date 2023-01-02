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

import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../owner.service';
import { Owner } from '../owner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-owner-delete',
  templateUrl: './owner-delete.component.html',
  styleUrls: ['./owner-delete.component.css'],
})
export class OwnerDeleteComponent implements OnInit {
  owner: Owner;
  errorMessage: string; // server error message
  ownerId: number;
  constructor(
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.owner = {} as Owner;
  }

  ngOnInit() {
    const ownerId = this.route.snapshot.params.id;
    this.ownerService.getOwnerById(ownerId).subscribe(
      (owner) => (this.owner = owner),
      (error) => (this.errorMessage = error as any)
    );
  }

  onSubmit(owner: Owner) {
    const ownerId = this.route.snapshot.params.id;
    this.ownerService.deleteOwner(ownerId).subscribe(
      () => this.gotoOwners(owner),
      (error) => (this.errorMessage = error as any)
    );
  }

  gotoOwners(owner: Owner) {
    this.errorMessage = null;
    this.router.navigate(['/owners']);
  }

  gotoOwnerDetail(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }
}
