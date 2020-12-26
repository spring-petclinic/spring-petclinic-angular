import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  get ownersChecked(){
    return this.searchService.ownersChecked; 
  }

  get petsChecked(){
    return this.searchService.petsChecked; 
  }

  get visitsChecked(){
    return this.searchService.visitsChecked;
  }

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

}
