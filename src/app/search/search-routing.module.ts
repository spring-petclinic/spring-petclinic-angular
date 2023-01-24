import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OwnerSearchComponent} from './owner-search/owner-search.component';
import {ResultListComponent} from './result-list/result-list.component';

const routes: Routes = [
  {path: 'search', component: OwnerSearchComponent},
  {path: 'result', component: ResultListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
