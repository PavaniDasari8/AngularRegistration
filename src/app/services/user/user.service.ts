import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = environment.baseUrl;
  userUrl = this.baseURL + 'user';
  constructor(private http: HttpClient) { }

  signUp(payload): Observable<any> {
    console.log(payload, 'from service');
    return this.http.post(this.userUrl + '/signup', payload).pipe(tap(res => {
      console.log(res, 'check res');
      return res;
    }));
  }

  logIn(payload): Observable<any> {
    return this.http.post(this.userUrl + '/login', payload).pipe(tap(res => {
      console.log(res, 'check res');
      return res;
    }));
  }
}
