import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Campus } from '../../shared/models/campus.model';
import { Segment } from '../../shared/models/segment.model';
import { Location } from '../../shared/models/location.model';
import 'rxjs/add/operator/catch';

@Injectable()
export class CheckinService {

    private _appUrl = "http://localhost:3000/API"

    constructor(private http: Http) { }

    // CHECKIN
    saveCheckin(userid, stickerid) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            this.http.post('/API/checkin/', JSON.stringify({userid: userid, locationid: stickerid}), options)
            .map(response => response.json()).map(item => User.fromJSON(item))
            .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
    }

    // REMOVE CHECKIN
    removeCheckin(userid): Observable<string> {
        return this.http.delete('/API/checkin/')
            .map(res => {
                return res.statusText;
            });
    }

    // UPDATE LOCATION
    updateLocation(location): Observable<Location> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(location);
        return this.http.put(`/API/location/`, location, options)
          .map(res => res.json()).map(item => Location.fromJSON(item));
    }

    // UPDATE SEGMENT
    updateSegment(segment): Observable<Segment> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(`/API/location/`, segment, options)
          .map(res => res.json()).map(item => Segment.fromJSON(item));
    }

    // CREATE LOCATION
    createLocation(location) : Observable<Location> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/API/location/', location, options)
        .map(res => res.json()).map(item => Location.fromJSON(item));
    }

    // CREATE SEGMENT
    createSegment(segment) : Observable<Segment> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/API/segment/', segment, options)
        .map(res => res.json()).map(item => Segment.fromJSON(item));
    }

    private handleError(operation: String) {
        return (err: any) => {
            let errMsg = `error in ${operation}() retrieving ${this._appUrl}`;
            console.log(`${errMsg}:`, err)
            if(err instanceof HttpErrorResponse) {
                // you could extract more info about the error if you want, e.g.:
                console.log(`status: ${err.status}, ${err.statusText}`);
                // errMsg = ...
            }
            return Observable.throw(errMsg);
        }
    }
}
