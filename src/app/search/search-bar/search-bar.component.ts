import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  illegalChar:boolean = false;
  
  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  submitSearch(searchTerm: string, ownersChecked: boolean, petsChecked: boolean, visitsChecked: boolean): void {
    if (searchTerm.includes('&')){
      this.illegalChar = true;
      return;
    }
    this.searchService.updateCriteria(searchTerm, ownersChecked, petsChecked, visitsChecked);
  }
}
