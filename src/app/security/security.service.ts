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

import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {User} from './user';
import {AuthClient} from './authClient';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthTokens} from './authTokens';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

@Injectable()
export class SecurityService {

  private entity_url = environment.ROOT_URL;

  constructor(private _http: HttpClient) {
  }

  static enccodeUser(user: User): string {
    return btoa(user.username + ':' + user.password);
  }

  // getLogin(): Observable<string> {
  //   return this._http.get((this.entity_url + 'login'), {responseType: 'string'})
  //     .map(response => response)
  //     .catch(this.handleError);
  // }

  getAuthTokens(user: User, authClient: AuthClient): Observable<AuthTokens> {
    const httpParams1: HttpParams = new HttpParams()
      .set('client_id', authClient.client_id)
      .set('grant_type', authClient.grant_type)
      .set('username', authClient.username)
      .set('password', authClient.password);
    const auth_header_value: string = ('Basic ' + SecurityService.enccodeUser(user));
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'authorization': auth_header_value
    });
    return this._http.post((this.entity_url + 'oauth/token'), httpParams1.toString(), {headers: headers})
      .map(response => <AuthTokens> response)
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
      console.error(JSON.stringify(error));
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

  saveToken(authToken: AuthTokens) {
    sessionStorage.setItem('access_token', authToken.access_token);
  }

  getAccesToken(): string {
    return sessionStorage.getItem('access_token');
  }

}
