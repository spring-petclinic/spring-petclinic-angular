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
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {PetType} from './pettype';

@Injectable()
export class PetTypeService {

  entity_url = environment.REST_API_URL + 'pettypes';

  constructor(private _http: Http) {
  }

  getPetTypes(): Observable<PetType[]> {
    return this._http.get(this.entity_url)
      .map((response: Response) => <PetType[]> response.json())
      .catch(this.handleError);
  }

  getPetTypeById(type_id: string): Observable<PetType> {
    return this._http.get((this.entity_url + '/' + type_id))
      .map((response: Response) => <PetType> response.json())
      .catch(this.handleError);
  }

  updatePetType(type_id: string, petType: PetType): Observable<PetType> {
    const body = JSON.stringify(petType);
    const headers = new Headers({'Content-Type': ' application/json;charset=UTF-8'});
    const options = new RequestOptions({headers: headers});
    return this._http.put((this.entity_url + '/' + type_id), body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  addPetType(petType: PetType): Observable<PetType> {
    const headers = new Headers();
    const body = JSON.stringify(petType);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return this._http.post(this.entity_url, body, {headers})
      .map((response: Response) => <PetType> response.json())
      .catch(this.handleError);
  }

  deletePetType(type_id: PetType): Observable<number> {
    return this._http.delete(this.entity_url + '/' + type_id)
      .map((response: Response) => response.status)
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    console.log('handleError log: ');
    let errMsg: string;
    if (error instanceof Response) {
      if (!(error.text() === '' )) {  // if response body not empty
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        console.log('binding errors header not empty');
        errMsg = error.headers.get('errors').toString();
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
