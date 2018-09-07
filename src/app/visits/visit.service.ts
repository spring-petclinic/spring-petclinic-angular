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
import {Observable} from 'rxjs';
import {Visit} from './visit';
import {environment} from '../../environments/environment';
import {HandleError, HttpErrorHandler} from "../error.service";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/internal/operators";

@Injectable()
export class VisitService {

  private entity_url = environment.REST_API_URL + 'visits';

  private handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');
  }

  getVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(this.entity_url)
      .pipe(
        catchError(this.handlerError('getVisits', []))
      );
  }

  getVisitById(visit_id: string): Observable<Visit> {
    return this.http.get<Visit>(this.entity_url + '/' + visit_id)
      .pipe(
        catchError(this.handlerError('getVisitById', {} as Visit))
      );
  }

  addVisit(visit: Visit): Observable<Visit> {
    return this.http.post<Visit>(this.entity_url, visit)
      .pipe(
        catchError(this.handlerError('addVisit', visit))
      );
  }

  updateVisit(visit_id: string, visit: Visit): Observable<Visit> {
    return this.http.put<Visit>(this.entity_url + '/' + visit_id, visit)
      .pipe(
        catchError(this.handlerError('updateVisit', visit))
      );
  }

  deleteVisit(visit_id: string): Observable<number> {
    return this.http.delete<number>(this.entity_url + '/' + visit_id)
      .pipe(
        catchError(this.handlerError('deleteVisit', 0))
      );

  }


}
