import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Segment } from '../../../../../shared/models/segment.model';

@Component({
  selector: 'app-segment-location-list',
  templateUrl: './segment-location-list.component.html',
  styleUrls: ['./segment-location-list.component.css']
})
export class SegmentLocationListComponent implements OnInit {

  @Input() public segments: Segment[];
  @Output() deleteSegmentEvent = new EventEmitter<Segment>();
  
  constructor() { }

  ngOnInit() {
  }

  deleteSegment(segment) {
    this.deleteSegmentEvent.next(segment);
  }

}
