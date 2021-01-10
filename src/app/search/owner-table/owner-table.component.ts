import { Component, OnInit } from '@angular/core';
import { Owner } from 'app/owners/owner';
import { OwnerService } from 'app/owners/owner.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-owner-table',
  templateUrl: './owner-table.component.html',
  styleUrls: ['./owner-table.component.css']
})
export class OwnerTableComponent implements OnInit {

  errorMessage: string;
  owners: Owner[] = [];
  filteredOwners: Owner[] = [];

  get ownersChecked(){
    return this.searchService.ownersChecked; 
  }

  constructor(private ownerService: OwnerService, private searchService: SearchService) {
  }

  ngOnInit() {
    this.searchService.searchTerm.subscribe(this.updateTable.bind(this));
  }

  updateTable(searchTerm: string):void {
    if (!this.ownersChecked || searchTerm === "") return;
    this.owners = [];
    this.ownerService.getOwnersBySearchTerm(searchTerm, false).subscribe(
      owners => this.owners = owners,
      error => this.errorMessage = error as any);
  }

  showAllResults():void {
    this.ownerService.getOwnersBySearchTerm(this.searchService.searchTerm.getValue(), true).subscribe(
      owners => this.owners = owners,
      error => this.errorMessage = error as any);
  }
}