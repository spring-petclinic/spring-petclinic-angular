import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../search.service';
import {Owner} from '../../owners/owner';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-owner-search',
  templateUrl: './owner-search.component.html',
  styleUrls: ['./owner-search.component.css']
})
export class OwnerSearchComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  keywords: string;
  owners: Owner[];
  errorMessage: string;
  lastName: string;
  length: number;
  pageSize: number = environment.RESULT_PAGINATOR_PAGE_SIZE;
  currentPage: number = 1;

  dataSource;

  constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onChangePage(pe: PageEvent) {
    const end = (pe.pageIndex + 1) * this.pageSize;
    const start = pe.pageIndex * this.pageSize;
    this.dataSource = this.owners.slice(start, end);
    console.log(this.dataSource);
    console.log(pe.pageIndex);
    console.log(pe.pageSize);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.keywords = params['search'];
    });
    this.searchService.getOwnersByKeywords(this.keywords).subscribe(
      owners => {
        this.owners = owners;
        console.log(owners);
        this.length = this.owners.length;
        const end = 5;
        const start =0;
        this.dataSource = this.owners.slice(start, end);
      },
      error => this.errorMessage = error as any);

  }

  onSelect(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }

  pageEvent: PageEvent;
}
