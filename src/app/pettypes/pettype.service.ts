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
import {environment} from '../../environments/environment';
import {PetType} from './pettype';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

@Injectable()
export class PetTypeService {

  entity_url = environment.REST_API_URL + 'pettypes';

  constructor(private _http: HttpClient) {
  }

  getPetTypes(): Observable<PetType[]> {
    return this._http.get(this.entity_url)
      .map(response => <PetType[]> response)
      .catch(this.handleError);
  }

  getPetTypeById(type_id: string): Observable<PetType> {
    return this._http.get((this.entity_url + '/' + type_id))
      .map(response => <PetType> response)
      .catch(this.handleError);
  }

  updatePetType(type_id: string, petType: PetType): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      }),
      observe: 'response' as 'response'
    };
    const body = JSON.stringify(petType);
    return this._http.put((this.entity_url + '/' + type_id), body, httpOptions)
      .map(response => response.status)
      .catch(this.handleError);
  }

  addPetType(petType: PetType): Observable<PetType> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    const body = JSON.stringify(petType);
    return this._http.post(this.entity_url, body, httpOptions)
      .map(response => <PetType> response)
      .catch(this.handleError);
  }

  deletePetType(type_id: string): Observable<any> {
    return this._http.delete((this.entity_url + '/' + type_id), {observe: 'response'})
      .map(response => response.status)
      .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
