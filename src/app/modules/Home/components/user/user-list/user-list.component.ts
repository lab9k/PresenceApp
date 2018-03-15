import { Component, OnInit, Input } from '@angular/core';
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
  
  constructor(private _userDataService: HomeDataService) { }

  ngOnInit() {
    this._filteredUsers = [];
    this.users.map(user => {
      this.segment.locations.map(location => {
        let loc = Location.fromJSON(location);
        if(user.checkin && loc.id === user.checkin.location) {
          this._filteredUsers.push(user);
        }
      })
    })
  }

  ngOnChanges() {
    this._filteredUsers = [];
    this.users.map(user => {
      this.segment.locations.map(location => {
        let loc = Location.fromJSON(location);
        if(user.checkin && loc.id === user.checkin.location) {
          this._filteredUsers.push(user);
        }
      })
    })
  }

  get filteredUsers() {
    return this._filteredUsers;
  }

}
