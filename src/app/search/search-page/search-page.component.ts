import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
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

  get searchTerm(){
    return this.searchService.searchTerm;
  }

  getStatus():number{
    if (this.searchTerm.getValue() != '' && (this.ownersChecked || this.petsChecked || this.visitsChecked)){
      return 0;
    } else if (this.searchTerm.getValue() == '') {
      return 1;
    } else {
      return 2;
    }
  }

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

}
