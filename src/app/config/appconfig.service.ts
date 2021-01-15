import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AppConfigService implements OnInit {

  private envUrl = '/config';
  private configSettings: any = null;

  constructor(private http: HttpClient) {}

  getAPI(url: string): Observable<any> {
    console.log(`*** getAPI(${url})`);
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.get(url)
        .pipe(map((response: Response) => response),
          catchError(this.handleError));
  }

  private handleError(error: Response) {
    console.log('*** handleError');
    console.log('ERROR::STATUS:::::' + error.status);
    console.log('ERROR::STATUS TEXT:::::' + error.statusText);
    if (error.status === 504 || error.status === 502 || error.status === 503) {
        return of('');
    } else {
       return of(JSON.stringify(error) || 'Server error');
    }
  }


  get settings() {
      console.log('*** getSettings');
      return this.configSettings;
  }

  public load(): Promise<any> {
    console.log('*** load()');
    return new Promise((resolve, reject) => {
      this.getAPI(this.envUrl).subscribe((response: any) => {
          console.log('response from the server:::', response);
          this.configSettings = response;
          resolve(true);
      });
    });
  }

  ngOnInit() {
    console.log('*** ngOnOnit()');
  }
}
