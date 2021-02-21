/**
 * @author Vitaliy Fedoriv
 * @author Oscar  Tsakam
 */

import {async, inject, TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { SearchService } from './search.service';


describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });
  });

  it('should ...', async(inject([HttpTestingController], (searchService: SearchService, http: HttpClient) => {
    expect(searchService).toBeTruthy();
  })));
});
