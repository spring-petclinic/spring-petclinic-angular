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
import {OwnerService} from '../../owners/owner.service';
import {Owner} from '../../owners/owner';
import {Router} from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-owner-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  errorMessage: string;
  owners: Owner[];
  value: string;

  constructor(private router: Router, private searchService: SearchService) {
  }

  ngOnInit() {
  
  }

  onSelect(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }


  globalSearch(value: string) {
    this.router.navigate(['owners/search',value ])
  }

  onSubmit(value: string) {
    const that = this;
    this.searchService.getSearchOwner(value).subscribe(
      error => this.errorMessage = error as any
    );
  }

  gotoOwnersList() {
    this.router.navigate(['/owners']);
  }

}
