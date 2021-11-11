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

/* tslint:disable:no-unused-variable */

/**
 * @author Vitaliy Fedoriv
 */

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

/* tslint:disable:no-unused-variable */

/**
 * @author Vitaliy Fedoriv
 */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
// Other imports
import { TestBed } from "@angular/core/testing";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";

import { HttpErrorHandler } from "../error.service";

import { OwnerService } from "./owner.service";
import { Owner } from "./owner";
import { Type } from "@angular/core";

describe("OwnerService", () => {
  let httpTestingController: HttpTestingController;
  let ownerService: OwnerService;
  let expectedOwners: Owner[];
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OwnerService, HttpErrorHandler],
    });


    httpTestingController = TestBed.get(HttpTestingController);
    ownerService = TestBed.get(OwnerService);
    expectedOwners = [
      { id: 1, firstName: "A" },
      { id: 2, firstName: "B" },
    ] as Owner[];

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    ownerService = TestBed.inject(OwnerService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it("should return expected owners (called once)", () => {
    ownerService
      .getOwners()
      .subscribe(
        (owners) =>
          expect(owners).toEqual(
            expectedOwners,
            "should return expected owners"
          ),
        fail
      );

    // OwnerService should have made one request to GET owners from expected URL
    const req = httpTestingController.expectOne(ownerService.entityUrl);
    expect(req.request.method).toEqual("GET");
   // Respond with the mock owners
    req.flush(expectedOwners);
  });
    beforeEach(() => {
      ownerService = TestBed.inject(OwnerService);
      expectedOwners = [
        { id: 1, firstName: 'A' },
        { id: 2, firstName: 'B' },
      ] as Owner[];
    });

  it("search the owner by id", () => {
    ownerService.getOwnerById("1").subscribe((owners) => {
      expect(owners).toEqual(expectedOwners[0]);
    });
    const id = 1;
    const req = httpTestingController.expectOne(
      ownerService.entityUrl + "/" + id
    );
    expect(req.request.method).toEqual("GET");
    req.flush(expectedOwners[0]);
  });

  it("add owner", () => {
    let owner = {
      id: 0,
      firstName: "Mary",
      lastName: "John",
      address: "",
      city: "",
      telephone: "",
      pets: [],
    };

    ownerService
      .addOwner(owner)
      .subscribe(
        (data) => expect(data).toEqual(owner, "should return new owner"),
        fail
      );

    const req = httpTestingController.expectOne(ownerService.entityUrl);
    expect(req.request.method).toEqual("POST");
    expect(req.request.body).toEqual(owner);

    //expect the server to return the owner after POST
    const expectedResponse = new HttpResponse({
      status: 201,
      statusText: "Created",
      body: owner,
    });
    req.event(expectedResponse);
  });

  it("updateOwner", () => {
    let owner = {
      id: 1,
      firstName: "Mary",
      lastName: "John",
      address: "",
      city: "",
      telephone: "",
      pets: [],
    };
    ownerService
      .updateOwner("1", owner)
      .subscribe((data) => expect(data).toEqual(owner, "updated owner"), fail);
    const req = httpTestingController.expectOne(ownerService.entityUrl + "/1");
    expect(req.request.method).toEqual("PUT");
    expect(req.request.body).toEqual(owner);
    const expectedResponse = new HttpResponse({
      status: 204,
      statusText: "No Content",
      body: owner,
    });
    req.event(expectedResponse);
  });

  it("delete Owner", () => {
    console.log("Inside Delete Owner");
    ownerService.deleteOwner("1").subscribe();
    const req = httpTestingController.expectOne(ownerService.entityUrl + "/1");
    expect(req.request.method).toEqual("DELETE");
    expect(req.request.body).toEqual(null);
  });

  it("search for delete Owner", () => {
    ownerService.getOwnerById("1").subscribe((owners) => {
      expect(owners).toBeUndefined();
    });

    const req = httpTestingController.expectOne(ownerService.entityUrl + "/1");
    expect(req.request.method).toEqual("GET");

    // respond with a 404 and the error message in the body
    req.flush("", { status: 404, statusText: "Not Found" });
  });
});
