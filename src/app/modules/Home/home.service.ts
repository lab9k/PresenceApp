import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Campus } from '../../shared/models/campus.model';

@Injectable()
export class HomeDataService {

  private _appUrl = 'http://localhost:3000/API';

  constructor(private http: Http) { }

  users(): Observable<User[]> {
    return this.http.get('/API/users/')
      .map(response => response.json().map(item => User.fromJSON(item)));
  }

  campuses(): Observable<Campus[]> {
    return this.http.get('/API/campuses')
      .map(response => response.json().map(item => Campus.fromJSON(item)));
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.http.get('/API/users/')
      .map(response => response.json().map(item => User.fromJSON(item)))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  // UPDATE USER
  updateUser(user): Observable<User> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`/API/user/`, user, options)
      .map(res => res.json()).map(item => User.fromJSON(item));
  }

  addMessage(user, message): Observable<User> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`/API/message/${user.id}`, message, options)
      .map(res => res.json()).map(item => User.fromJSON(item));
  }
}
