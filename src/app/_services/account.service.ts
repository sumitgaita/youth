import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private currentUserSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
       private http: HttpService
    ) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.user = this.currentUserSubject.asObservable();
    }

  public get userValue(): User {    
      return this.currentUserSubject.value;
    }

    //login(username, password) {
    //    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
    //        .pipe(map(user => {
    //            // store user details and jwt token in local storage to keep user logged in between page refreshes
    //            localStorage.setItem('user', JSON.stringify(user));
    //            this.userSubject.next(user);
    //            return user;
    //        }));
    //}
  login(username: string, password: string): Observable<any> {
    return this.http.getLoginToken<any>(username, password)
      .pipe(map(adminLogin => {
        adminLogin.id = Number(adminLogin.id);
        if (adminLogin.id > 0) {
          localStorage.setItem('currentUser', JSON.stringify(adminLogin));
          this.currentUserSubject.next(adminLogin);
          return adminLogin;
        }
      }));
  }
  dumyLogin() {
    let adminLogin: User = { id: '122', username: 'test', password: 'test' };
    localStorage.setItem('currentUser', JSON.stringify(adminLogin));
    this.currentUserSubject.next(adminLogin);
    return adminLogin;
  }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

  
    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                   // this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}
