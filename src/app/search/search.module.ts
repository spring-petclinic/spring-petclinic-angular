import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {OwnerSearchComponent} from './owner-search/owner-search.component';
import {SearchComponent} from './search.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {SearchService} from './search.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {PetSearchComponent} from './pet-search/pet-search.component';
import {ResultListComponent} from './result-list/result-list.component';
import {VetSearchComponent} from './vet-search/vet-search.component';
import {VisitSearchComponent} from './visit-search/visit-search.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    OwnerSearchComponent,
    SearchComponent,
    PetSearchComponent,
    ResultListComponent,
    VetSearchComponent,
    VisitSearchComponent
  ],
  exports: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    FormsModule
  ], providers: [SearchService]
})
export class SearchModule {
}
