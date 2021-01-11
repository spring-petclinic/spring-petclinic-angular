import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { OwnerTableComponent } from './owner-table/owner-table.component';
import { PetTableComponent } from './pet-table/pet-table.component';
import { VisitTableComponent } from './visit-table/visit-table.component';
import { SearchRoutingModule } from './search-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    SearchBarComponent,
    SearchPageComponent,
    OwnerTableComponent,
    PetTableComponent,
    VisitTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule
  ],
  exports: [
    SearchBarComponent,
    SearchPageComponent,
  ],
})
export class SearchModule { }
