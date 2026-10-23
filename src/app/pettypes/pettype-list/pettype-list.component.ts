import {Component, computed, inject, linkedSignal, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {PetType} from '../pettype';
import {Router} from '@angular/router';
import {PetTypeService} from '../pettype.service';
import {resourceErrorMessage, valueOrDefault} from '../../utils/resource-utils';

@Component({
  selector: 'app-pettype-list',
  standalone: false,
  templateUrl: './pettype-list.component.html',
  styleUrls: ['./pettype-list.component.css']
})
export class PettypeListComponent {
  private pettypeService = inject(PetTypeService);
  private router = inject(Router);

  private readonly pettypesResource = rxResource({
    stream: () => this.pettypeService.getPetTypes(),
  });

  // local copy so that added and deleted pet types appear without reloading the list
  readonly pettypes = linkedSignal(() => valueOrDefault(this.pettypesResource, [] as PetType[]));
  readonly isPetTypesDataReceived = computed(() => !this.pettypesResource.isLoading());
  readonly isInsert = signal(false);

  private readonly deleteError = signal<string | null>(null);
  readonly errorMessage = computed(() => this.deleteError() ?? resourceErrorMessage(this.pettypesResource));

  deletePettype(pettype: PetType) {
    this.pettypeService.deletePetType(pettype.id.toString()).subscribe({
      next: () => this.pettypes.update(pettypes => pettypes.filter(currentItem => currentItem.id !== pettype.id)),
      error: error => this.deleteError.set(String(error))
    });
  }

  onNewPettype(newPetType: PetType) {
    this.pettypes.update(pettypes => [...pettypes, newPetType]);
    this.showAddPettypeComponent();
  }

  showAddPettypeComponent() {
    this.isInsert.update(isInsert => !isInsert);
  }

  showEditPettypeComponent(updatedPetType: PetType) {
    this.router.navigate(['/pettypes', updatedPetType.id.toString(), 'edit']);
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }
}
