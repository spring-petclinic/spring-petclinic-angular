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

import {VisitsRoutingModule} from './visits-routing.module';
import {CommonModule} from '@angular/common';
import {VisitListComponent} from './visit-list/visit-list.component';
import {VisitEditComponent} from './visit-edit/visit-edit.component';
import {NgModule} from '@angular/core';
import {VisitService} from './visit.service';
import {VisitAddComponent} from './visit-add/visit-add.component';
import {FormsModule} from '@angular/forms';
import {PetsRoutingModule} from '../pets/pets-routing.module';
import { Md2Module } from 'md2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Md2Module,
    VisitsRoutingModule,
    PetsRoutingModule
  ],
  declarations: [
    VisitListComponent,
    VisitEditComponent,
    VisitAddComponent
  ],
  exports: [
    VisitListComponent,
    VisitEditComponent,
    VisitAddComponent
  ],
  providers: [VisitService]
})
export class VisitsModule {
}
