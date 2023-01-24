import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm;
  empty: boolean = false;
  ngOnInit(): void {
  }
  search: string ='';

  constructor(private router: Router) {
  }

  clickSearch(search: string) {
    console.log(search);
    if(search == '') {
      this.empty = true;
    }
    if(search != ''){
      this.empty = false;
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/result'], {queryParams: {search: search}});
      });
      this.search = '';
    }
  }

  resetEmpty() {
    this.empty = false;
  }


}
