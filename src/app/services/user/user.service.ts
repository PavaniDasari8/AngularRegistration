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

  userNameValidation(name): Observable<any> {
    return this.http.get(this.userUrl + '/validate/userName/' + name).pipe(tap(res => {
      console.log(res, 'check res');
      return res;
    }));
  }

  emailValidation(email): Observable<any> {
    console.log(email, 'to validate');
    return this.http.get(this.userUrl + '/validate/email/' + email).pipe(tap(res => {
      console.log(res, 'check res');
      return res;
    }));
  }
}
