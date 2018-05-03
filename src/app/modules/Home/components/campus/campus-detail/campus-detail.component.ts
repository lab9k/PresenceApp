import { Component, OnInit } from '@angular/core';
import { Campus } from '../../../../../shared/models/campus.model';
import { User } from '../../../../../shared/models/user.model';
import { Segment } from '../../../../../shared/models/segment.model';
import { DataService } from '../../../../../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campus-detail',
  templateUrl: './campus-detail.component.html',
  styleUrls: ['./campus-detail.component.css']
})
export class CampusDetailComponent implements OnInit {

  private _campus: Campus;
  private _users: User[];
  private _segments: Segment[];
  private _vergaderingSegments: Segment[];

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this._segments = [];
    this._vergaderingSegments = [];
    this.route.data.subscribe(item => {
      this._campus = item['campus'];
    });
    this.dataService.users().subscribe(res => {
      this._users = res;
      console.log(this._campus);
      this._campus.segments.forEach(segment => {
        if (segment.isVergadering) {
          this._vergaderingSegments.push(segment);
        } else {
          this._segments.push(segment);
        }
      });
    });
  }

  get campus() {
    return this._campus;
  }

  get users() {
    return this._users;
  }

  get segments() {
    return this._segments;
  }

  get vergaderingSegments() {
    return this._vergaderingSegments;
  }

}
