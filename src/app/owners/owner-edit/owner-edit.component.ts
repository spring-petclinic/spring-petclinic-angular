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
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/Rx';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {
  public owner;
  errorMessage: string;

  constructor(private ownerService: OwnerService, private route: ActivatedRoute, private router: Router) {
    this.owner = <Owner>{};
  }

  ngOnInit() {
    const ownerId = this.route.snapshot.params['id'];
    this.ownerService.getOwnerById(ownerId).subscribe(
      owner => this.owner = owner,
      error => this.errorMessage = <any> error);
  }

  onSubmit(owner) {
    var that = this;
    this.ownerService.updateOwner(owner.id.toString(), owner).subscribe(
      get_result,
      get_error
    );

    function get_error(error) {
      console.log(error);
      console.log('error catched');
      return this.errorMessage = <any> error;
    }

    function get_result(update_status) {
      console.log(update_status);
      if (update_status.status === 204) {
        console.log('update success');
        that.gotoOwnerDetail(owner);
      } else {
        return console.log('update failed');
      }
    }
  };

  gotoOwnerDetail(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }



}
