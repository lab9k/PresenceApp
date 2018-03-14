import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { DataService } from '../../../../shared/services/data.service';
import { Location } from '../../../../shared/models/location.model';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  private _location: Location;
  private _time: String;

  constructor(private authService: AuthenticationService, private dataService: DataService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.dataService.getUserById(user).subscribe(usr => {
        if(usr.checkin) {
          this.dataService.getLocationById(usr.checkin.location).subscribe(loc => {
            this._location = loc;
            this._time = this.timeConverter(usr.checkin.time);
          });
        }
      });
    });
  }

  get location() {
    return this._location;
  }

  get time() {
    return this._time;
  }

  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  removeCheckin() {
    console.log("remove checkin");
  }

}
