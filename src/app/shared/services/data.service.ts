import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Location } from '../models/location.model';
import { Campus } from '../models/campus.model';
import { User } from '../../shared/models/user.model';
import { Segment } from '../models/segment.model';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  // GET USERS
  users(): Observable<User[]> {
    return this.http.get('/API/users/')
      .map(response => response.json().map(item => User.fromJSON(item)));
  }

  // GET LOCATIONS
  locations(): Observable<Location[]> {
    return this.http.get('/API/locations/')
      .map(response => response.json().map(item => Location.fromJSON(item)));
  }

  // GET SEGMENTS
  segments(): Observable<Segment[]> {
    return this.http.get('/API/segments/')
      .map(response => response.json().map(item => Segment.fromJSON(item)));
  }

  // GET CAMPUSES
  campuses(): Observable<Campus[]> {
    return this.http.get('/API/campuses')
      .map(response => response.json().map(item => Campus.fromJSON(item)));
  }

  // GET USER BY ID
  getUserById(id): Observable<User> {
    return this.http.get(`/API/user/${id}`)
      .map(response => response.json()).map(item => User.fromJSON(item));
  }

  // GET USER BY NAME
  getUserByName(name): Observable<User> {
    return this.http.get(`/API/user/name/${name}`)
      .map(response => response.json()).map(item => User.fromJSON(item));
  }

  // GET LOCATION BY ID
  getLocationById(id): Observable<Location> {
    return this.http.get(`/API/location/${id}`)
      .map(response => response.json()).map(item => Location.fromJSON(item));
  }

  // GET LOCATION BY NAME
  getLocationByName(name): Observable<Location> {
    return this.http.get(`/API/location/name/${name}`)
      .map(response => response.json()).map(item => Location.fromJSON(item));
  }

  // GET SEGMENT BY ID
  getSegmentById(id): Observable<Segment> {
    return this.http.get(`/API/segment/${id}`)
      .map(response => response.json()).map(item => Segment.fromJSON(item));
  }

  // GET SEGMENT BY NAME
  getSegmentByName(name): Observable<Segment> {
    return this.http.get(`/API/segment/name/${name}`)
      .map(response => response.json()).map(item => Segment.fromJSON(item));
  }

  // GET CAMPUS BY ID
  getCampusById(id): Observable<Campus> {
    return this.http.get(`/API/campus/${id}`)
      .map(response => response.json()).map(item => Campus.fromJSON(item));
  }

  // GET CAMPUS BY NAME
  getCampusByName(name): Observable<Campus> {
    return this.http.get(`/API/campus/name/${name}`)
      .map(response => response.json()).map(item => Campus.fromJSON(item));
  }

  // GET LOCATION WITH STICKER
  getLocationWithSticker(sticker): Observable<Location> {
    return this.http.get(`/API/location/sticker/${sticker}`)
      .map(response => response.json()).map(item => {
        return Location.fromJSON(item[0]);
      });
  }
}
