import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { DataService } from '../../../../shared/services/data.service';
import { Location } from '../../../../shared/models/location.model';
import { CheckinService } from '../../checkin.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  private _location: Location;
  private _time: String;

  constructor(private authService: AuthenticationService, private dataService: DataService, private checkinService: CheckinService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.dataService.getUserById(user).subscribe(usr => {
        if (usr.checkin) {
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

  timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    const sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  removeCheckin() {
    this.checkinService.removeCheckin(this.authService.user.getValue()).subscribe();
    console.log('remove checkin');
  }

}
