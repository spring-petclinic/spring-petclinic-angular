import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchTerm = new BehaviorSubject<string>('');
  ownersChecked: boolean = false;
  petsChecked: boolean = false;
  visitsChecked: boolean = false;

  updateCriteria(searchTerm: string, ownersChecked: boolean, petsChecked: boolean, visitsChecked: boolean): void {
    this.searchTerm.next(encodeURIComponent(searchTerm));
    this.ownersChecked = ownersChecked;
    this.petsChecked = petsChecked;
    this.visitsChecked = visitsChecked;
  }

  constructor() { }
}
