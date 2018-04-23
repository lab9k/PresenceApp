import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  private _appUrl = 'http://localhost:3000/API';
  private _ipUrl: 'https://api.ipify.org';
  private _user: BehaviorSubject<string>;
  public auth2: any;
  public redirectUrl: string;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._user = new BehaviorSubject<string>(
      currentUser && currentUser.email);
    this.isLoggedIn().subscribe(loggedIn => {
        if (loggedIn) {
            this.getCurrentUser().subscribe(res => {
                if (res !== null) {
                    localStorage.setItem('currentUser',
                    JSON.stringify({ email: res.id, name: res.name, picture: res.picture}));
                this._user.next(res.id);
                }
            });
        }else {
            localStorage.removeItem('currentUser');
            setTimeout(() => this._user.next(null));
        }
    });

   }

  logout() {
    if (this.user.getValue()) {
        localStorage.removeItem('currentUser');
        setTimeout(() => this._user.next(null));
        this.http.get('/auth/logout').subscribe();
    }
  }

  get user(): BehaviorSubject<string> {
      return this._user;
  }

  getCurrentUser(): Observable<User> {
    return this.http.get('/auth/user')
        .map(response => {
            return response.json();
                }).map(item => {
                    if (!item.message) {
                        return User.fromJSON(item);
                    }
                    return null;
                });
  }

  isLoggedIn(): Observable<boolean> {
      return this.http.get('/auth/isLoggedIn').map(res => {
        return res.json();
      }).map(item => {
          return item.isLoggedIn;
      });
  }

  register(phoneid): Observable<boolean> {
    return this.http.get(`/API/register/${phoneid}`).map(res => {
        return res.json();
      }).map(item => {
          return item.register;
      });
  }

  removePhone(user): Observable<User> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`/API/user/removephoneid`, user)
      .map(res => res.json()).map(item => User.fromJSON(item));
  }

  getIp(): Observable<String[]> {
    return this.http.get('https://api.ipify.org/')
      .map(res => res.json());
  }
}
