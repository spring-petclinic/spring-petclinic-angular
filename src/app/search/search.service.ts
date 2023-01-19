import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HandleError, HttpErrorHandler} from '../error.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Owner} from '../owners/owner';
import {catchError} from 'rxjs/operators';
import {Pet} from '../pets/pet';
import {Vet} from '../vets/vet';
import {Visit} from '../visits/visit';

@Injectable()
export class SearchService {
  entityUrl = environment.REST_API_URL + 'search';

  private readonly handlerError: HandleError;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.handlerError = httpErrorHandler.createHandleError('SearchService');
  }

  getOwnersByKeywords(keywords: string): Observable<Owner[]> {
    return this.http
      .get<Owner[]>(this.entityUrl + '/owners?keywords=' + keywords)
      .pipe(catchError(this.handlerError('getOwnerByKeywords', {} as Owner[])));
  }
  getPetsByKeywords(keywords: string): Observable<Pet[]> {
    return this.http
      .get<Pet[]>(this.entityUrl + '/pets?keywords=' + keywords)
      .pipe(catchError(this.handlerError('getPetByKeywords', {} as Pet[])));
  }

  getVetsByKeywords(keywords: string): Observable<Vet[]> {
    return this.http
      .get<Vet[]>(this.entityUrl + '/vets?keywords=' + keywords)
      .pipe(catchError(this.handlerError('getVetByKeywords', {} as Vet[])));
  }

  getVisitsByKeywords(keywords: string): Observable<Visit[]> {
    return this.http
      .get<Visit[]>(this.entityUrl + '/visits?keywords=' + keywords)
      .pipe(catchError(this.handlerError('getVisitByKeywords', {} as Visit[])));
  }
}
