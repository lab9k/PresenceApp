import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../../shared/models/user.model';
import { DataService } from '../../../../../shared/services/data.service';
import { Location } from '../../../../../shared/models/location.model';
import { Message } from '../../../../../shared/models/message.model';
import { HomeDataService } from '../../../home.service';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';

import * as Identicon from 'identicon.js';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() public user: User;
  private _location: Location;
  private _color: String;
  private _opacity: String;
  private _img: String;

  constructor(private dataService: DataService, private homeService: HomeDataService, private authService: AuthenticationService) { }

  ngOnInit() {
    this._img = 'data:image/png;base64,' + new Identicon(this.user.name + this.user.id, 420).toString();
    this._location = this.user.checkin.location;
    const diff = +new Date() - this.user.checkin.time;
    const diffHours = diff / 3600000;
    this._opacity = (1 - (diffHours / 24)).toString();
    if (diff <= 60000 * 60) {
      this._color = 'green';
    } else if (diff <= 60000 * 180) {
      this._color = 'olive';
    } else if (diff <= 60000 * 300) {
      this._color = 'yellow';
    } else {
      this._color = 'red';
    }
  }

  get location() {
    return this._location;
  }

  get color() {
    return this._color;
  }

  get opacity() {
    return this._opacity;
  }

  get img() {
    return this._img;
  }

  userSelected() {
    console.log('User ' +  this.user.name + ' selected');
    $('#' + this.user.id).modal('show');
  }

  sendMessage() {
    console.log('User ' +  this.user.name + ' message');
    const subject = $('input[name=\'subject-' + this.user.id + '\']').val();
    const content = $('textarea[name=\'message-' + this.user.id + '\']').val();
    if (content.trim() !== '') {
      console.log(subject + '\n' + content);
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
