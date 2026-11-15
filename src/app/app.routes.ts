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

import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './parts/page-not-found/page-not-found.component';
import {WelcomeComponent} from './parts/welcome/welcome.component';
import {ownerRoutes} from './owners/owners.routes';
import {petRoutes} from './pets/pets.routes';
import {visitRoutes} from './visits/visits.routes';
import {pettypesRoutes} from './pettypes/pettypes.routes';
import {vetRoutes} from './vets/vets.routes';
import {specialtyRoutes} from './specialties/specialties.routes';

export const routes: Routes = [
  ...ownerRoutes,
  ...petRoutes,
  ...visitRoutes,
  ...pettypesRoutes,
  ...vetRoutes,
  ...specialtyRoutes,
  {path: 'welcome', component: WelcomeComponent},
  {path: '', component: WelcomeComponent},
  {path: '**', component: PageNotFoundComponent}
];
