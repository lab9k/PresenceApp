import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Campus } from '../../../../../shared/models/campus.model';
import { Location } from '../../../../../shared/models/location.model';
import { Segment } from '../../../../../shared/models/segment.model';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {

  @Input() public campus: Campus;
  @Output() selectCampusEvent = new EventEmitter<Campus>();
  @Output() selectSegmentEvent = new EventEmitter<Segment>();
  @Output() selectLocationEvent = new EventEmitter<Location>();
  @Output() createSegmentEvent = new EventEmitter<Campus>();
  @Output() createLocationEvent = new EventEmitter<Segment>();

  constructor() { }

  ngOnInit() {
  }

  selected() {
    this.selectCampusEvent.next(this.campus);
  }

  selectSegment(segment) {
    this.selectSegmentEvent.next(segment);
  }

  selectLocation(location) {
    this.selectLocationEvent.next(location);
  }

  createSegment(event) {
    this.createSegmentEvent.next(this.campus);
  }

  createLocation(segment) {
    this.createLocationEvent.next(segment);
  }

}
