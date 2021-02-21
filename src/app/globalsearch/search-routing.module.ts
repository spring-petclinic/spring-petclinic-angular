/**
 * @author Oscar Tsakam
 */

import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './value-search/search.component';
import { ResultSearchComponent } from './result/result.component';
 

 const searchRoutes : Routes = [
     {path: 'search', component: SearchComponent},
     {path: 'search/:value', component: ResultSearchComponent}
 ];

 @NgModule({
     imports: [RouterModule.forChild(searchRoutes)],
     exports: [RouterModule]
 })

 export class SearchRoutingModule{

 }