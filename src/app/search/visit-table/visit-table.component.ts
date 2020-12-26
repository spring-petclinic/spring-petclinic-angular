import { Component, OnInit } from '@angular/core';
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
  visits: Visit | Visit[] = [];

  constructor(private visitService: VisitService, private searchService: SearchService) { 
    this.visits = [];
  }

  ngOnInit() {
    this.searchService.searchTerm.subscribe(this.updateTable.bind(this));
  }

  updateTable(searchTerm: string):void {
    this.visits = [];
    this.visitService.getVisitsBySearchTerm(searchTerm).subscribe(
      visits => this.visits = visits,
      error => this.errorMessage = error as any);
  }
}
