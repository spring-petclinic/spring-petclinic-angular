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

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { OwnerAddComponent } from "./owner-add.component";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { OwnerService } from "../owner.service";
import { RouterTestingModule } from "@angular/router/testing";
import { RouterStub } from "../../testing/router-stubs";
import { Owner } from "../owner";
import { Observable, of } from "rxjs";
import { By } from "@angular/platform-browser";
import { OwnersRoutingModule } from "../owners-routing.module";
import { OwnerListComponent } from "../owner-list/owner-list.component";
class OwnserServiceStub {
  addOwner(owner: Owner): Observable<Owner> {
    return of(owner);
  }
}

describe("OwnerAddComponent", () => {
  let component: OwnerAddComponent;
  let fixture: ComponentFixture<OwnerAddComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerAddComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: OwnerService, useClass: OwnserServiceStub },
        { provide: Router, useClass: RouterStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it("should create OwnerAddComponent", () => {
    expect(component).toBeTruthy();
  });

  it("First Name check invalid", async(() => {
    fixture.whenStable().then(() => {
      let firstName = component.ownerForm.controls["firstName"];
      expect(firstName.valid).toBeFalsy();
      expect(component.ownerForm.valid).toBeFalsy();
      firstName.setValue("J");
      expect(firstName.errors["minlength"]).toBeTruthy();
      firstName.setValue("John");
      expect(firstName.errors).toBeFalsy();
    });
  }));

  it("First Name check invalid", async(() => {
    fixture.whenStable().then(() => {
      let lastName = component.ownerForm.controls["lastName"];
      expect(lastName.valid).toBeFalsy();
      expect(component.ownerForm.valid).toBeFalsy();
      lastName.setValue("S");
      expect(lastName.errors["minlength"]).toBeTruthy();
      lastName.setValue("Smith");
      expect(lastName.errors).toBeFalsy();
    });
  }));

  it("check form submission is successful", async(() => {
    fixture.whenStable().then(() => {
      let firstName = component.ownerForm.form.controls["firstName"];
      let lastName = component.ownerForm.form.controls["lastName"];

      firstName.setValue("Mary");
      lastName.setValue("John");
      let ownerServiceStub = new OwnserServiceStub();
      let owner = {
        id: 0,
        firstName: "Mary",
        lastName: "John",
        address: "",
        city: "",
        telephone: "",
        pets: [],
      };
      let buttons = fixture.debugElement.queryAll(By.css("button"));
      let addButton = buttons[1].nativeElement;
      addButton.click();
      spyOn(router, "navigate");
      spyOn(component, "gotoOwnersList").and.callThrough();
      component.gotoOwnersList();
      expect(router.navigate).toHaveBeenCalledWith(["/owners"]);
    });
  }));
});
