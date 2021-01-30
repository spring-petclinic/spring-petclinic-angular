import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from 'app/owners/owner';
import { Vet } from 'app/vets/vet';
import { Visit } from 'app/visits/visit';
import { VisitService } from 'app/visits/visit.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-visit-table',
  templateUrl: './visit-table.component.html',
  styleUrls: ['./visit-table.component.css']
})
export class VisitTableComponent implements OnInit {


  errorMessage: string;
  visits: Visit[] = [];

  get visitsChecked(){
    return this.searchService.visitsChecked;
  }

  constructor(private router: Router, private visitService: VisitService, private searchService: SearchService) { 
    this.visits = [];
  }

  ngOnInit() {
    this.searchService.searchTerm.subscribe(this.updateTable.bind(this));
  }

  updateTable(searchTerm: string):void {
    if (!this.visitsChecked  || searchTerm === "") return;
    this.visits = [];
    this.visitService.getVisitsBySearchTerm(searchTerm, false).subscribe(
      visits => this.visits = visits,
      error => this.errorMessage = error as any);
  }

  showAllResults():void {
    this.visitService.getVisitsBySearchTerm(this.searchService.searchTerm.getValue(), true).subscribe(
      visits => this.visits = visits,
      error => this.errorMessage = error as any);
  }

  onSelectOwner(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }

  onSelectVet(vet: Vet) {
    this.router.navigate(['/vets/visits', vet.id, 'showVisits']);
  }
}
