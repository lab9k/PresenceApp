import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Segment } from '../../../../../shared/models/segment.model';
import { Location } from '../../../../../shared/models/location.model';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {

  @Input() public segment: Segment;
  @Output() selectSegmentEvent = new EventEmitter<Segment>();
  @Output() selectLocationEvent = new EventEmitter<Location>();
  @Output() createLocationEvent = new EventEmitter<Segment>();

  constructor() { }

  ngOnInit() {
  }

  selected() {
    this.selectSegmentEvent.next(this.segment);
  }

  selectLocation(location) {
    this.selectLocationEvent.next(location);
  }

  createLocation(event) {
    this.createLocationEvent.next(this.segment);
  }

}
