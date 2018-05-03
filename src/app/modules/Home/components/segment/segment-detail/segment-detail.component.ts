import { Component, OnInit } from '@angular/core';
import { Segment } from '../../../../../shared/models/segment.model';
import { User } from '../../../../../shared/models/user.model';
import { Checkin } from '../../../../../shared/models/checkin.model';
import { DataService } from '../../../../../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-segment-detail',
  templateUrl: './segment-detail.component.html',
  styleUrls: ['./segment-detail.component.css']
})
export class SegmentDetailComponent implements OnInit {

  private _segment: Segment;
  private _users: User[];

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(item => {
      this._segment = item['segment'];
    });
    this.dataService.users().subscribe(res => {
      this._users = res;
    });
  }

  addDummy() {
    const name = Math.random().toString(36).substring(7);
    const checkin = new Checkin(+new Date(), this._segment.locations[0]);
    const birthday = Math.floor(Math.random() * 70 + 1930) + '-' + Math.ceil(Math.random() * 12) + '-' + Math.ceil(Math.random() * 30);
    const user = new User(null, name, checkin, null, null, null, null, null, birthday);
    this._users.push(user);
    this._users = this._users.slice(0);
  }

  get segment() {
    return this._segment;
  }

  get users() {
    return this._users;
  }

}
