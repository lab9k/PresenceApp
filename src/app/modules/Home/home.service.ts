import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Campus } from '../../shared/models/campus.model';
import { Message } from '../../shared/models/message.model';

@Injectable()
export class HomeDataService {

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

  createMessage(message): Observable<Message> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`/API/message/`, message, options)
      .map(res => res.json()).map(item => Message.fromJSON(item));
  }
}
