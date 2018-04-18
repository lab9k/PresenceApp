import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Campus } from '../../../../../shared/models/campus.model';
import { Segment } from '../../../../../shared/models/segment.model';
import { Location } from '../../../../../shared/models/location.model';
import { AdminDataService } from '../../../admin.service';
import { DataService } from '../../../../../shared/services/data.service';

@Component({
  selector: 'app-segment-list',
  templateUrl: './segment-list.component.html',
  styleUrls: ['./segment-list.component.css']
})
export class SegmentListComponent implements OnInit, OnDestroy {

  @Input() public campus: Campus;
  private _segments: Segment[];
  @Output() selectSegmentEvent = new EventEmitter<Segment>();
  @Output() selectLocationEvent = new EventEmitter<Location>();
  @Output() createSegmentEvent = new EventEmitter<Location>();
  @Output() createLocationEvent = new EventEmitter<Segment>();

  constructor(private adminDataService: AdminDataService, private dataService: DataService) {
  }

  ngOnInit() {
    this._segments = [];
    this.campus.segments.forEach(seg => {
      if (seg.id !== undefined) {
        this._segments.push(seg);
      } else {
        this.campus.segments.pop();
      }
    });
  }

  ngOnDestroy() {
  }

  selectSegment(segment) {
    this.selectSegmentEvent.next(segment);
  }

  selectLocation(location) {
    this.selectLocationEvent.next(location);
  }

  createSegment() {
    this.createSegmentEvent.next();
  }

  createLocation(segment) {
    this.createLocationEvent.next(segment);
  }

  get segments() {
    return this._segments;
  }
}
