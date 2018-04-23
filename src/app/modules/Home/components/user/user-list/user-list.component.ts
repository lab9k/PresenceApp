import { Component, OnInit, Input, HostListener } from '@angular/core';
import { HomeDataService } from '../../../home.service';
import { User } from '../../../../../shared/models/user.model';
import { Campus } from '../../../../../shared/models/campus.model';
import { Location } from '../../../../../shared/models/location.model';
import { Segment } from '../../../../../shared/models/segment.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() public segment: Segment;
  @Input() public users: User[];
  private _filteredUsers: User[];
  public mobile: boolean;

  constructor(private _userDataService: HomeDataService) { }

  ngOnInit() {
    if (window.innerWidth <= 768) { // 768px portrait
      this.mobile = true;
    } else {
      this.mobile = false;
    }
    this._filteredUsers = [];
    this.users.map(user => {
      this.segment.locations.map(location => {
        const loc = Location.fromJSON(location);
        if (user.checkin && loc.id === user.checkin.location.id) {
          this._filteredUsers.push(user);
        }
      });
    });
  }

  ngOnChanges() {
    this._filteredUsers = [];
    this.users.map(user => {
      this.segment.locations.map(location => {
        const loc = Location.fromJSON(location);
        if (user.checkin && loc.id === user.checkin.location.id) {
          this._filteredUsers.push(user);
        }
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 768) { // 768px portrait
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  get filteredUsers() {
    return this._filteredUsers;
  }

}
