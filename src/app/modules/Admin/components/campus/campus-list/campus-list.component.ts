import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Campus } from '../../../../../shared/models/campus.model';
import { Segment } from '../../../../../shared/models/segment.model';
import { Location } from '../../../../../shared/models/location.model';

@Component({
  selector: 'app-campus-list',
  templateUrl: './campus-list.component.html',
  styleUrls: ['./campus-list.component.css']
})
export class CampusListComponent implements OnInit {

  @Input() public campuses: Campus[];
  @Output() selectCampusEvent = new EventEmitter<Campus>();
  @Output() selectSegmentEvent = new EventEmitter<Segment>();
  @Output() selectLocationEvent = new EventEmitter<Location>();
  @Output() createSegmentEvent = new EventEmitter<Campus>();
  @Output() createLocationEvent = new EventEmitter<Segment>();

  constructor() { }

  ngOnInit() {
  }

  selectCampus(campus) {
    this.selectCampusEvent.next(campus);
  }

  selectSegment(segment) {
    this.selectSegmentEvent.next(segment);
  }

  selectLocation(location) {
    this.selectLocationEvent.next(location);
  }

  createSegment(event) {
    this.createSegmentEvent.next(event);
  }

  createLocation(segment) {
    this.createLocationEvent.next(segment);
  }

}
