import { Component, inject, output, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { pettypeSchema } from '../pettype-form';
import { firstValueFrom } from 'rxjs';
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

  private readonly pettype = signal({ name: '' });
  readonly errorMessage = signal<string | null>(null);
  readonly newPetType = output<PetType>();

  protected readonly pettypeForm = form(
    this.pettype,
    pettypeSchema,
    {
      submission: {
        action: async () => {
          try {
            const newPettype = await firstValueFrom(
              this.pettypeService.addPetType({ id: null, name: this.pettype().name })
            );
            this.newPetType.emit(newPettype);
          } catch (error) {
            this.errorMessage.set(String(error));
          }
          return undefined;
        }
      }
    }
  );
}
