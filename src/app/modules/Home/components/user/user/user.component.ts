import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../../shared/models/user.model';
import { DataService } from '../../../../../shared/services/data.service';
import { Location } from '../../../../../shared/models/location.model';
import { Message } from '../../../../../shared/models/message.model';
import { HomeDataService } from '../../../home.service';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';

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
  
  constructor(private dataService: DataService, private homeService: HomeDataService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.dataService.getLocationById(this.user.checkin.location)
      .subscribe(loc => {
        this._location = loc;
      });
    let diff = +new Date() - this.user.checkin.time;
    if(diff <= 60000 * 30) {
      this._opacity = "1";
      this._color = "green";
    }
    else if(diff <= 60000 * 60) {
      this._opacity = "0.9";
      this._color = "olive";
    }
    else if(diff <= 60000 * 120) {
      this._opacity = "0.7";
      this._color = "yellow";
    }
    else {
      this._opacity = "0.5";
      this._color = "red";
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

  userSelected() {
    console.log("User " +  this.user.name + " selected");
    $('#' + this.user.id).modal('show');
  }

  sendMessage() {
    console.log("User " +  this.user.name + " message");
    let subject = $("input[name='subject-" + this.user.id + "']").val();
    let content = $("textarea[name='message-" + this.user.id + "']").val();
    if(content.trim() !== "") {
      console.log(subject + "\n" + content);
      let user = {
        name: this.user.name,
        id: this.user.id
      }
      let message = new Message(null, user, subject, content, false);
      //this.user.addMessage(message);
      this.homeService.addMessage(this.user, message).subscribe();
    }
  }
}