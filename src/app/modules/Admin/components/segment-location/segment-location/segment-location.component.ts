import { Component, OnInit, Input } from '@angular/core';
import { Segment } from '../../../../../shared/models/segment.model';

@Component({
  selector: 'app-segment-location',
  templateUrl: './segment-location.component.html',
  styleUrls: ['./segment-location.component.css']
})
export class SegmentLocationComponent implements OnInit {

  @Input() public segment: Segment;
  
  constructor() { }

  ngOnInit() {
  }

}
