import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../../shared/models/user.model';
import { Location } from '../../../../../shared/models/location.model';
import { Message } from '../../../../../shared/models/message.model';
import { HomeDataService } from '../../../home.service';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  @Input() public user: User;
  private _location: Location;
  private _opacity: String;
  public birthday: boolean;

  constructor(private homeService: HomeDataService, private authService: AuthenticationService) { }

  ngOnInit() {
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
    this._location = this.user.checkin.location;
    const diff = +new Date() - this.user.checkin.time;
    const diffHours = diff / 3600000;
    this._opacity = (1 - (diffHours / 24)).toString();
  }

  get location() {
    return this._location;
  }

  get opacity() {
    return this._opacity;
  }

  userSelected() {
    $('#' + this.user.id + this.user.name.replace(/\s/g, '')).modal('show');
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

  get name() {
    return this.user.name.replace(/\s/g, '');
  }
}
