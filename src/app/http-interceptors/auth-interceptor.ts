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
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {SecurityService} from '../security/security.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private securityService: SecurityService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const accessToken = this.securityService.getAccesToken();
   // do nothing if token is null
   // or if authentication process
   // TODO: write log ?
   if ((accessToken === null) || (req.url === 'http://localhost:8080/petclinic/oauth/token')) {
     return next.handle(req);
   }

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
