import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '@environments/environment';
import { catchError, tap } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class HttpService {
  currentUser: any;
  constructor(private http: HttpClient) {

  }

  outSiteGet<T>(url: string): Observable<T> {
    return this.http.get<T>(this.getFullUrl(url))
      .pipe(tap((res: any) => {
        this.onSuccess(res);
      },
        (error: HttpErrorResponse) => {
          this.onError(error, url);
        }),
      );
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.getFullUrl(url), { headers: this.getRequestHeader() })
      .pipe(tap((res: any) => {
        this.onSuccess(res);
      }, (error: HttpErrorResponse) => {
        this.onError(error, url);
      }),
      );
  }

  upload<T>(url: string, data: any): Observable<HttpEvent<T>> {
    const req = new HttpRequest(
      'POST', this.getFullUrl(url), data, { reportProgress: true }
    );
    return this.http.request<T>(req)
      .pipe(tap((res: any) => {
        this.onSuccess(res);
      }, (error: HttpErrorResponse) => {
        this.onError(error, url);
      }),
      );
  }

  post<T>(url: string, jsonData: any): Observable<T> {
    return this.http.post<T>(this.getFullUrl(url), JSON.stringify(jsonData), { headers: this.getRequestHeader() })
      .pipe(tap((res: any) => {
        this.onSuccess(res);
      }, (error: HttpErrorResponse) => {
        this.onError(error, url, jsonData);
      }),
      );
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(this.getFullUrl(url), data, { headers: this.getRequestHeader() })
      .pipe(tap((res: any) => {
        this.onSuccess(res);
      }, (error: HttpErrorResponse) => {
        this.onError(error, url, data);
      }),
      );
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.getFullUrl(url), { headers: this.getRequestHeader() })
      .pipe(tap((res: any) => {
        this.onSuccess(res);
      }, (error: HttpErrorResponse) => {
        this.onError(error, url);
      }),
      );
  }

  getLoginToken<T>(username: string, password: string): Observable<T> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', (username))
      .set('password', password)
    return this.http.post<T>(`${environment.apiUrl}/token`, body.toString())
      .pipe(tap((res: any) => {
        this.onSuccess(res);
      }, (error: HttpErrorResponse) => {
        this.onError(error, `${environment.apiUrl}/token`, username);
      }),
      );
  }

  private getRequestHeader(): HttpHeaders {
   // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return new HttpHeaders({
      'Content-Type': 'application/json',
     // 'Authorization': 'Bearer ' + this.currentUser.access_token,
      'Cache-Control': 'no-cache',
      'If-Modified-Since': '0'
    });
  }


  private getFullUrl(url: string): string {
    return `${environment.apiUrl}/api-docs/` + url;
  }

  private onSuccess(res: any): any {
    return res;
  }


  private onError(res: HttpErrorResponse, url: string, data?: any) {
    if (res.status === 0) {
      this.logError(res, url, data);
      // this.dialogService.alert('Network error', 'Unable to connect to the server. Please check your internet connection.');
    }
    else {
      if (res.status >= 400 && res.status <= 499) {
        this.logError(res, url, data);
      }
      //this.dialogService.error('Error Code ' + res.status, res.error.ExceptionMessage || res.error.Message
      //  || 'The system encoumtered an error processing this action. Please check your internet connection and try again later.');
    }
  }

  private logError(res: HttpErrorResponse, url: string, data?: any) {
    if (localStorage.getItem('LogNetwork')) {
      const now = new data();
      localStorage.setItem('IMCS Application_' + now, JSON.stringify({
        timestamp: now,
        event: 'API Call Error',
        user: sessionStorage.getItem('userId'),
        url: url,
        status: res.status,
        statusText: res.statusText,
        message: res.message,
        data: data
      }));
    }
  }
}
