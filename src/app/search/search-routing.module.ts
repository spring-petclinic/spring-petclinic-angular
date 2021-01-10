import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';

const searchRoutes: Routes = [
   {path: 'search', component: SearchPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(searchRoutes)],
  exports: [RouterModule]
})

export class SearchRoutingModule {
}
