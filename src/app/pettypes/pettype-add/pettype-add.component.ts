import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PetType} from "../pettype";
import {PetTypeService} from "../pettype.service";

@Component({
  selector: 'app-pettype-add',
  templateUrl: './pettype-add.component.html',
  styleUrls: ['./pettype-add.component.css']
})
export class PettypeAddComponent implements OnInit {
  pettype: PetType;
  errorMessage: string;
  @Output() onNew = new EventEmitter<PetType>();

  constructor(private pettypeService: PetTypeService) {
    this.pettype = <PetType>{};
  }

  ngOnInit() {
  }

  onSubmit(pettype: PetType){
    pettype.id = null;
    this.pettypeService.addPetType(pettype).subscribe(
      new_pettype => {
        this.pettype = new_pettype;
        this.onNew.emit(this.pettype);
      },
      error => this.errorMessage = <any>error
    );
  }

}
