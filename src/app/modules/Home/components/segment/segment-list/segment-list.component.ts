import { Component, OnInit, Input } from '@angular/core';
import { Segment } from '../../../../../shared/models/segment.model';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-segment-list',
  templateUrl: './segment-list.component.html',
  styleUrls: ['./segment-list.component.css']
})
export class SegmentListComponent implements OnInit {

  @Input() public segments: Segment[];
  @Input() public users: User[];

  constructor() { }

  ngOnInit() {
  }

}
