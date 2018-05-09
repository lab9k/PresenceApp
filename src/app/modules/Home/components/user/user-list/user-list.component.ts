import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { HomeDataService } from '../../../home.service';
import { User } from '../../../../../shared/models/user.model';
import { Campus } from '../../../../../shared/models/campus.model';
import { Location } from '../../../../../shared/models/location.model';
import { Segment } from '../../../../../shared/models/segment.model';
import { DataService } from '../../../../../shared/services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  get filteredUsers() {
    return this._filteredUsers;
  }

}
