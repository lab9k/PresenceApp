import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HomeDataService } from '../../../home.service';
import { Campus } from '../../../../../shared/models/campus.model';
import { User } from '../../../../../shared/models/user.model';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-campus-list',
  templateUrl: './campus-list.component.html',
  styleUrls: ['./campus-list.component.css']
})
export class CampusListComponent implements OnInit {

  private _campuses: Campus[];
  private _users: any;
  private usr: User;

  socket = io();

  constructor(private _homeDataService: HomeDataService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchUsers();
    this._homeDataService.campuses()
      .subscribe(items => this._campuses = items);

    this.socket.on('new-checkin', function(data) {
      for (let i = 0; i < this._users.length; i++) {
        if (this._users[i].id === data.user._id) {
          this._users.splice(i, 1);
          this.usr = User.fromJSON(data.user);
          if (data.user._checkin) {
            this.usr.checkin.location = data.user._checkin.location._id;
          }else {
            this.usr.checkin.location = data.user.checkin.location._id;
          }

          this._users.push(this.usr);
          // sort users
          this.sortUsers();
          break;
        }
      }
      this._users = this._users.slice(0);
      this.cd.detectChanges();
    }.bind(this));
    this.socket.on('new-checkout', function(data) {
      console.log(data);
      this.usr = User.fromJSON(data.user);
      for (let i = 0; i < this._users.length; i++) {
        if (this._users[i].id === data.user._id) {
          this._users.splice(i, 1);
          this._users.push(this.usr);
          this.sortUsers();
          break;
        }
      }
      this._users = this._users.slice(0);
      this.cd.detectChanges();
    }.bind(this));
    setTimeout(function(){
      location.reload();
    }, 300000);
  }

  get campuses() {
    return this._campuses;
  }

  get users() {
    return this._users;
  }

  fetchUsers() {
    this._homeDataService.getUsers().then((res) => {
      this._users = res;
      // sort users
      this.sortUsers();
    }, (err) => {
      console.log(err);
    });
  }

  sortUsers() {
    this._users = this._users.sort((a, b) => {
      if ((a.checkin !== undefined && b.checkin === undefined) || (a.checkin !== null && b.checkin === null)) {
        return -1;
      }
      if ((a.checkin === undefined && b.checkin !== undefined) || (a.checkin === null && b.checkin !== null)) {
        return 1;
      }
      if ((a.checkin === undefined && b.checkin === undefined) || (a.checkin === null && b.checkin === null)) {
        return 0;
      }
      if (a.checkin.time > b.checkin.time) {
          return -1;
      }
      if (a.checkin.time < b.checkin.time) {
          return 1;
      }
      return 0;
  });
  }

}
