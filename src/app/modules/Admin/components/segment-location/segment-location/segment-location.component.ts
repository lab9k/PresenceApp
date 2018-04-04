import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Segment } from '../../../../../shared/models/segment.model';

@Component({
  selector: 'app-segment-location',
  templateUrl: './segment-location.component.html',
  styleUrls: ['./segment-location.component.css']
})
export class SegmentLocationComponent implements OnInit {

  @Input() public segment: Segment;
  @Output() deleteSegmentEvent = new EventEmitter<Segment>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleteSegmentEvent.next(this.segment);
  }
}
