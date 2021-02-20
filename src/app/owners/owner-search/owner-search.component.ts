
import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../owner.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-owner-search',
    templateUrl: './owner-search.component.html',
    styleUrls: ['./owner-search.component.css']
  })

  export class OwnerSearchComponent implements OnInit {

    value: String;
    errorMessage: string;
  
    constructor(private ownerService: OwnerService, private router: Router) {
      this.value = {} as String;
    }
  
    ngOnInit() {
    }
  
    onSubmit(id: String) {
      
      this.ownerService.getSearchOwner.subscribe(
        newOwner => {
          
          this.gotoOwnersList();
        },
        error => this.errorMessage = error as any
      );
    }
  
    gotoOwnersList() {
      this.router.navigate(['/owners']);
    }
  
  }
  