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

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {VetListComponent} from './vet-list/vet-list.component';
import {VetService} from './vet.service';
import {VetsRoutingModule} from './vets-routing.module';
import {VetEditComponent} from './vet-edit/vet-edit.component';
import {VetAddComponent} from './vet-add/vet-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VetsRoutingModule
  ],
  declarations: [
    VetListComponent,
    VetEditComponent,
    VetAddComponent
  ],
  exports: [
    VetListComponent,
    VetEditComponent,
    VetAddComponent
  ],
  providers: [VetService]
})
export class VetsModule {
}
