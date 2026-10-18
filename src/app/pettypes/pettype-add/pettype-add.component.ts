import { Component, inject, output, signal } from '@angular/core';
import {PetType} from '../pettype';
import {PetTypeService} from '../pettype.service';

@Component({
  selector: 'app-pettype-add',
  standalone: false,
  templateUrl: './pettype-add.component.html',
  styleUrls: ['./pettype-add.component.css']
})
export class PettypeAddComponent {
  private pettypeService = inject(PetTypeService);

  // the form fields are bound to the properties of this object with ngModel
  pettype = {} as PetType;
  readonly errorMessage = signal<string | null>(null);
  readonly newPetType = output<PetType>();

  onSubmit(pettype: PetType) {
    pettype.id = null;
    this.pettypeService.addPetType(pettype).subscribe({
      next: newPettype => this.newPetType.emit(newPettype),
      error: error => this.errorMessage.set(String(error))
    });
  }

}
