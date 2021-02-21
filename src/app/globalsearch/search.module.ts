/**
 * Oscar Tsakam
 */

 /**
  * @author Oscar Tsakam
  */
  
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './value-search/search.component';
import { ResultSearchComponent } from './result/result.component';
import { SearchService } from './search.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SearchRoutingModule
    ],
    declarations: [
        SearchComponent,
        ResultSearchComponent
    ],
    providers: [SearchService]
})
export class SearchModule {

}