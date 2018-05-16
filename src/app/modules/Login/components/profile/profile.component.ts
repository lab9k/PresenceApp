import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { User } from '../../../../shared/models/user.model';
import { Location } from '../../../../shared/models/location.model';
import { Router } from '@angular/router';
import { DataService } from '../../../../shared/services/data.service';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _user: User;
  private _location: Location;
  private _time: String;

  constructor(private authService: AuthenticationService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user) {
        this.dataService.getUserById(user).subscribe(usr => {
          this._user = usr;
          if (usr.checkin) {
            this.dataService.getLocationById(usr.checkin.location.id).subscribe(loc => {
              this._location = loc;
              this._time = this.timeConverter(usr.checkin.time);
            });
          }
        });
      } else {
        this.router.navigate(['/account/login']);
      }
    });
    setTimeout(function() {
      $('#calendar').calendar({
        type: 'date',
        formatter: {
          date: function (date, settings) {
            if (!date) { return ''; }
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return year + '-' + month + '-' + day;
          }
        },
        onChange: function(date, text, mode) {
          this.user.birthday = text;
          this.updateUser();
        }.bind(this)
      });
    }.bind(this), 2000);
    $('#calendar').calendar({
      type: 'date'
    });
  }

  get user() {
    return this._user;
  }

  get location() {
    return this._location;
  }

  get time() {
    return this._time;
  }

  updateUser() {
    this.authService.updateUser(this.user).subscribe();
  }

  deletePhoneId() {
    this._user.phoneid = undefined;
    this.authService.removePhone(this._user).subscribe();
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

}
