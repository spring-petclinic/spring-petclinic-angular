import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../search.service';
import {Vet} from '../../vets/vet';

@Component({
  selector: 'app-vet-search',
  templateUrl: './vet-search.component.html',
  styleUrls: ['./vet-search.component.css']
})
export class VetSearchComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  keywords: string;
  vets: Vet[];
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
    this.dataSource = this.vets.slice(start, end);
    console.log(this.dataSource);
    console.log(pe.pageIndex);
    console.log(pe.pageSize);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.keywords = params['search'];
    });
    this.searchService.getVetsByKeywords(this.keywords).subscribe(
      vets => {
        this.vets = vets;
        console.log(vets);
        this.length = this.vets.length;
        const end = 5;
        const start =0;
        this.dataSource = this.vets.slice(start, end);
      },
      error => this.errorMessage = error as any);

  }

  onSelect(vet: Vet) {
    this.router.navigate(['/vets', vet.id]);
  }
}
