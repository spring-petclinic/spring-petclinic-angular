import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../search.service';
import {Visit} from '../../visits/visit';

@Component({
  selector: 'app-visit-search',
  templateUrl: './visit-search.component.html',
  styleUrls: ['./visit-search.component.css']
})
export class VisitSearchComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  keywords: string;
  visits: Visit[];
  errorMessage: string;
  lastName: string;
  length: number;
  pageSize: number = 5;
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
    this.dataSource = this.visits.slice(start, end);
    console.log(this.dataSource);
    console.log(pe.pageIndex);
    console.log(pe.pageSize);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.keywords = params['search'];
    });
    this.searchService.getVisitsByKeywords(this.keywords).subscribe(
      visits => {
        this.visits = visits;
        console.log(visits);
        this.length = this.visits.length;
        const end = 5;
        const start =0;
        this.dataSource = this.visits.slice(start, end);
      },
      error => this.errorMessage = error as any);

  }

  onSelect(visit: Visit) {
    this.router.navigate(['/visits', visit.id]);
  }

}
