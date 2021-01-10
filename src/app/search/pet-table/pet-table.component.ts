import { Component, OnInit } from '@angular/core';
import { Owner } from 'app/owners/owner';
import { OwnerService } from 'app/owners/owner.service';
import { Pet } from 'app/pets/pet';
import { PetService } from 'app/pets/pet.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-pet-table',
  templateUrl: './pet-table.component.html',
  styleUrls: ['./pet-table.component.css']
})
export class PetTableComponent implements OnInit {

  errorMessage: string;
  pets: Pet[] = [];

  get petsChecked(){
    return this.searchService.petsChecked;
  }

  constructor(private petService: PetService, private searchService: SearchService) {
  }

  ngOnInit() {
    this.searchService.searchTerm.subscribe(this.updateTable.bind(this));
  }

  updateTable(searchTerm: string):void {
    if (!this.petsChecked  || searchTerm === "") return;
    this.pets = [];
    this.petService.getPetsBySearchTerm(searchTerm, false).subscribe(
      pets => this.pets = pets,
      error => this.errorMessage = error as any);
  }

  showAllResults():void {
    this.petService.getPetsBySearchTerm(this.searchService.searchTerm.getValue(), true).subscribe(
      pets => this.pets = pets,
      error => this.errorMessage = error as any);
  }
}
