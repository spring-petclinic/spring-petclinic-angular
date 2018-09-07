import { Component, OnInit } from '@angular/core';
import {PetType} from "../pettype";
import {Router} from "@angular/router";
import {PetTypeService} from "../pettype.service";
import {Specialty} from "../../specialties/specialty";

@Component({
  selector: 'app-pettype-list',
  templateUrl: './pettype-list.component.html',
  styleUrls: ['./pettype-list.component.css']
})
export class PettypeListComponent implements OnInit {
  pettypes: PetType[];
  errorMessage: string;
  response_status: number;
  is_insert: boolean = false;

  constructor(private pettypeService: PetTypeService, private router: Router) {
    this.pettypes = <PetType[]>[];
  }

  ngOnInit() {
    this.pettypeService.getPetTypes().subscribe(
      pettypes => this.pettypes = pettypes,
      error => this.errorMessage = <any>error
    );
  }

  deletePettype(pettype: PetType) {
    this.pettypeService.deletePetType(pettype.id.toString()).subscribe(
      response => {
        this.response_status = response;
        this.pettypes = this.pettypes.filter(current_item => !(current_item.id === pettype.id));
      },
      error => this.errorMessage = <any> error);
  }

  onNewPettype(new_pettype: Specialty){
    this.pettypes.push(new_pettype);
    this.showAddPettypeComponent();
  }

  showAddPettypeComponent() {
    this.is_insert = !this.is_insert;
  }

  showEditPettypeComponent(updated_pettype: PetType) {
    this.router.navigate(['/pettypes', updated_pettype.id.toString(), 'edit']);
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }
}
