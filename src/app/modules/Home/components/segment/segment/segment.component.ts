import { Component, OnInit, Input } from '@angular/core';
import { Segment } from '../../../../../shared/models/segment.model';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {

  @Input() public segment: Segment;
  @Input() public users: User[];
  
  constructor() { }

  ngOnInit() {
  }

}
