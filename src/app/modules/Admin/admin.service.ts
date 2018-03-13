import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Campus } from '../../shared/models/campus.model';
import { Location } from '../../shared/models/location.model';
import { Segment } from '../../shared/models/segment.model';

@Injectable()
export class AdminDataService {

  private _appUrl = "http://localhost:3000/API"

  constructor(private http: Http) { }

  // UPDATE LOCATION
  updateLocation(location): Observable<Location> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(`/API/location/`, location, options)
      .map(res => res.json()).map(item => Location.fromJSON(item));
  }

  // UPDATE SEGMENT
  updateSegment(segment): Observable<Segment> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(`/API/segment/`, segment, options)
      .map(res => res.json()).map(item => Segment.fromJSON(item));
  }

  // UPDATE CAMPUS
  updateCampus(campus): Observable<Campus> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(`/API/campus/`, JSON.stringify(campus), options)
      .map(res => res.json()).map(item => Campus.fromJSON(item));
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

  // CREATE CAMPUS
  createCampus(campus) : Observable<Campus> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/API/campus/', campus, options)
      .map(res => res.json()).map(item => Campus.fromJSON(item));
  }

}
