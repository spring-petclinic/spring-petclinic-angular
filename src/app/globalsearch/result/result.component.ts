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
import {Owner} from '../../owners/owner';
import {Router} from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-owner-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultSearchComponent implements OnInit {
  errorMessage: string;
  owners: Owner[];
  value: string;

  constructor(private router: Router, private searchService: SearchService) {
  }

  ngOnInit() {
    this.value = null;
  }

  gotoSearchList(value : string) {
    this.router.navigate(['/value', value]);
  }

  onSelect(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }

}
