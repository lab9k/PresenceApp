import { Component, OnInit, Input } from '@angular/core';
import { Campus } from '../../../../../shared/models/campus.model';
import { HomeDataService } from '../../../home.service';
import { User } from '../../../../../shared/models/user.model';
import { Segment } from '../../../../../shared/models/segment.model';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {

  @Input() public campus: Campus;
  @Input() public users: User[];
  private _segments: Segment[];
  private _vergaderingSegments: Segment[];

  constructor() { }

  ngOnInit() {
    this._segments = [];
    this._vergaderingSegments = [];
    this.campus.segments.forEach(segment => {
      if (segment.isVergadering) {
        this._vergaderingSegments.push(segment);
      } else {
        this._segments.push(segment);
      }
    });
  }

  get segments() {
    return this._segments;
  }

  get vergaderingSegments() {
    return this._vergaderingSegments;
  }
}
