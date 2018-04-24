import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HomeDataService } from '../../../home.service';
import { Campus } from '../../../../../shared/models/campus.model';
import { User } from '../../../../../shared/models/user.model';
import * as io from 'socket.io-client';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';

declare var $: any;
@Component({
  selector: 'app-campus-list',
  templateUrl: './campus-list.component.html',
  styleUrls: ['./campus-list.component.css']
})
export class CampusListComponent implements OnInit {

  private _campuses: Campus[];
  private _lunchCampuses: Campus[];
  private _thuiswerkCampuses: Campus[];
  private _users: any;
  private usr: User;
  private _correctIp: boolean;

  private _userNames;
  socket = io();

  constructor(private _homeDataService: HomeDataService, private cd: ChangeDetectorRef, private authService: AuthenticationService) { }

  ngOnInit() {
    $.getJSON('https://api.ipdata.co', function(data) {
      this.authService.getCurrentUser().subscribe(currentUser => {
        if (currentUser === null) {
          this._correctIp = (data['ip'] === '212.123.26.150');
        } else {
          this._correctIp = true;
        }
      });
    }.bind(this));
    this._campuses = [];
    this._lunchCampuses = [];
    this._thuiswerkCampuses = [];
    this._userNames = [];
    this.fetchUsers();

    this.socket.on('new-checkin', function(data) {
      const user = User.fromJSON(data.user);
      this.usr = User.fromJSON(data.user);
      this.usr.visible = true;
      this._users.push(this.usr);
      console.log(user);
      for (let i = 0; i < this._users.length; i++) {
        if (this._users[i].id === user._id) {
          console.log(data);
          this._users.splice(i, 1);
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
      this.ngOnInit();
    }.bind(this), 300000);
  }

  get campuses() {
    return this._campuses;
  }

  get lunchCampuses() {
    return this._lunchCampuses;
  }

  get thuiswerkCampuses() {
    return this._thuiswerkCampuses;
  }

  get users() {
    return this._users;
  }

  get correctIp() {
    return this._correctIp;
  }

  filter(event) {
    this.filterUsers($('input[name=\'search\']').val().toLowerCase());
  }

  fetchUsers() {
    this._homeDataService.getUsers().then((res) => {
      this._users = res;
      for (let i = 0; i < this._users.length; i++) {
        this._userNames.push({
          'title': this._users[i].name,
          'image': this._users[i].picture,
          'description': this._users[i].checkin.location.name
        });
      }
      $('.ui.search')
      .search({
        source: this._userNames
      });
      // sort users
      this._homeDataService.campuses()
      .subscribe(items => {
        for (let i = 0, len = items.length; i < len; i++) {
          if (items[i].isLunch) {
            this._lunchCampuses.push(items[i]);
          } else if (items[i].isThuiswerk) {
            this._thuiswerkCampuses.push(items[i]);
          } else {
            this._campuses.push(items[i]);
          }
          if (i + 1 === len) {
            this.sortUsers();
          }
        }
        this.sortCampuses();
        this.sortSegments();
        this.sortLocations();
      });
    }, (err) => {
      console.log(err);
    });
  }

  filterUsers(search) {
    if (search !== undefined && search.trim() !== '') {
      for (let i = 0, len = this._users.length; i < len; i++) {
        this._users[i].visible = (this._users[i].name.toLowerCase().includes(search));
      }
      this._users = this._users.slice(0);
    } else {
      for (let i = 0, len = this._users.length; i < len; i++) {
        this._users[i].visible = true;
      }
    }
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
    this.filterUsers('');
  }

  sortCampuses() {
    this._campuses = this._campuses.sort((a, b) => {
      if (a.weight > b.weight) {
        return -1;
      } else if (a.weight < b.weight) {
        return 1;
      }
      return 0;
    });
  }

  sortSegments() {
    for (let i = 0, len = this._campuses.length; i < len; i++) {
      if (this._campuses[i].segments !== undefined) {
        this._campuses[i].segments = this._campuses[i].segments.sort((a, b) => {
          if (a.weight > b.weight) {
            return -1;
          } else if (a.weight < b.weight) {
            return 1;
          }
          return 0;
        });
      }
    }
  }

  sortLocations() {
    for (let i = 0, len = this._campuses.length; i < len; i++) {
      if (this._campuses[i].segments !== undefined) {
        for (let j = 0, len2 = this._campuses[i].segments.length; j < len2; j++) {
          if (this._campuses[i].segments[j] !== undefined) {
            this._campuses[i].segments[j].locations = this._campuses[i].segments[j].locations.sort((a, b) => {
              if (a.weight > b.weight) {
                return -1;
              } else if (a.weight < b.weight) {
                return 1;
              }
              return 0;
            });
          }
        }
      }
    }
  }

}
