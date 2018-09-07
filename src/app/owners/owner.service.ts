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

import {Injectable} from '@angular/core';
import {Owner} from './owner';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HttpErrorHandler, HandleError} from '../error.service';


@Injectable()
export class OwnerService {

  entity_url = environment.REST_API_URL + 'owners';

  private handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');
  }

  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.entity_url)
      .pipe(
        catchError(this.handlerError('getOwners', []))
      );
  }

  getOwnerById(owner_id: string): Observable<Owner> {
    return this.http.get<Owner>(this.entity_url + '/' + owner_id)
      .pipe(
          catchError(this.handlerError('getOwnerById', {} as Owner))
      );
  }

  addOwner(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(this.entity_url, owner)
      .pipe(
        catchError(this.handlerError('addOwner', owner))
      );
  }

  updateOwner(owner_id: string, owner: Owner): Observable<{}> {
    return this.http.put<Owner>(this.entity_url + '/' + owner_id, owner)
      .pipe(
        catchError(this.handlerError('updateOwner', owner))
      );
  }

  deleteOwner(owner_id: string): Observable<{}> {
    return this.http.delete<Owner>(this.entity_url + '/' + owner_id)
      .pipe(
         catchError(this.handlerError('deleteOwner', [owner_id]))
      );
  }


}
