/**
 * @author Oscar Tsakam
 */

import {Injectable} from '@angular/core';
import {Search} from './search';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../error.service';
import { Owner } from 'app/owners/owner';

@Injectable()
export class SearchService{
    
    entityUrl = environment.REST_API_URL + 'search';

    private readonly handlerError: HandleError;

    constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler){
        this.handlerError = httpErrorHandler.createHandleError('SearchService');
    }

    getSearchOwner(value: string): Observable<Owner[]> {
        return this.http.get<Owner[]>(this.entityUrl+ '/'+ value)
            .pipe(
                catchError(this.handlerError('getSearchOwner', []))
            );
    }
}