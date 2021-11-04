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

import { Component, OnInit, ViewChild } from "@angular/core";
import { OwnerService } from "../owner.service";
import { Owner } from "../owner";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-owner-add",
  templateUrl: "./owner-add.component.html",
  styleUrls: ["./owner-add.component.css"],
})
export class OwnerAddComponent implements OnInit {
  @ViewChild("ownerForm", { static: true }) ownerForm: NgForm;
  owner: Owner;
  errorMessage: string;

  constructor(private ownerService: OwnerService, private router: Router) {
    this.owner = {} as Owner;
  }

  ngOnInit() {}

  onSubmit(owner: Owner) {
    console.log(
      "Inside owner add inside onSubmit " +
        "Owner value  address" +
        owner.address +
        "Owner value city" +
        owner.city +
        "Owner first name" +
        owner.firstName +
        "Owner last name" +
        owner.lastName +
        "Owner pets" +
        owner.pets +
        "Owner telephone" +
        owner.telephone
    );
    owner.id = null;

    this.ownerService.addOwner(owner).subscribe(
      (newOwner) => {
        console.log("Insde owner service add owner subscribe");
        this.owner = newOwner;
        this.gotoOwnersList();
      },
      (error) => (this.errorMessage = error as any)
    );
  }

  gotoOwnersList() {
    console.log("inside goto owners list");
    this.router.navigate(["/owners"]);
    console.log("Navigated to /owners");
  }
}
