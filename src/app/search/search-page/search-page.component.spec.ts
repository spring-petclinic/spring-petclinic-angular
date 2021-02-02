import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SearchBarComponent } from '../search-bar/search-bar.component';

import { SearchPageComponent } from './search-page.component';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPageComponent, SearchBarComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have components on load', () => {
    let searchBar = el.querySelector('app-search-bar');
    expect(searchBar).toBeTruthy();

    // let searchPrompt = el.querySelector('.searchPrompt');
    let searchPrompt = fixture.nativeElement.querySelector('.searchPrompt');
    expect(searchPrompt).toBeTruthy;
    expect(searchPrompt.innerText).toEqual('Please enter a search term.')
  });

  it('should not show any tables on load',() => {
    let ownerTable = el.querySelector('app-owner-table');
    let petTable = el.querySelector('app-pet-table');
    let visitTable = el.querySelector('app-visit-table');
    expect(ownerTable).toBeFalsy();
    expect(petTable).toBeFalsy();
    expect(visitTable).toBeFalsy();
  });
});
