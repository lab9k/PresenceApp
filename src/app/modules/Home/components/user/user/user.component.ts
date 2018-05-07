import { Component, OnInit, Input, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../../../../shared/models/user.model';
import { DataService } from '../../../../../shared/services/data.service';
import { Location } from '../../../../../shared/models/location.model';
import { Message } from '../../../../../shared/models/message.model';
import { HomeDataService } from '../../../home.service';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';

// import * as Identicon from 'identicon.js';
// const jdenticon = require('jdenticon');

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  @Input() public user: User;
  private _location: Location;
  private _opacity: String;
  private _img: String;
  public mobile: boolean;
  public birthday: boolean;

  constructor(private dataService: DataService, private homeService: HomeDataService, private authService: AuthenticationService) { }

  ngOnInit() {
    console.log('Load user');
    if (window.innerWidth <= 768) { // 768px portrait
      this.mobile = true;
    } else {
      this.mobile = false;
    }
    if (this.user.birthday !== null && this.user.birthday !== undefined) {
      const a = this.user.birthday.split('-');
      const b = new Date();
      const month = a[1];
      const date = a[2];
      const monthToday = b.getMonth() + 1;
      const dateToday = b.getDate();
      if ((month === monthToday.toString()) && (date === dateToday.toString())) {
        this.birthday = true;
      } else {
        this.birthday = false;
      }
    } else {
      this.birthday = false;
    }
    // set up options
    /*
    let hash = '';
    while (hash.length < 15) {
      for (let i = 0; i < this.user.name.length; i++) {
        hash += this.user.name.charCodeAt(i);
      }
    }
    const options = {
          margin: 0.2,                              // 20% margin
          size: 420,                                // 420px square
          format: 'png'                             // use SVG instead of PNG
        };

    // create a base64 encoded SVG
    const data = new Identicon(hash, options).toString();
    this._img = 'data:image/png;base64,' + data;
    */

    this._location = this.user.checkin.location;
    const diff = +new Date() - this.user.checkin.time;
    const diffHours = diff / 3600000;
    this._opacity = (1 - (diffHours / 24)).toString();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 768) { // 768px portrait
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  get location() {
    return this._location;
  }

  get opacity() {
    return this._opacity;
  }

  get img() {
    return this._img;
  }

  userSelected() {
    $('#' + this.user.id).modal('show');
  }

  sendMessage() {
    const subject = $('input[name=\'subject-' + this.user.id + '\']').val();
    const content = $('textarea[name=\'message-' + this.user.id + '\']').val();
    if (content.trim() !== '') {
      let user;
      this.authService.getCurrentUser().subscribe(res => {
        user = {
          id: res.id,
          name: res.name
        };
        const message = new Message(null, user, subject, content, false);
        this.homeService.createMessage(message).subscribe(resMessage => {
          this.user.addMessage(resMessage);
          this.homeService.updateUser(this.user).subscribe();
        });
      });
    }
  }
}
