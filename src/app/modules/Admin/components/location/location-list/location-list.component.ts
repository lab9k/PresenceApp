import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AdminDataService } from '../../../admin.service';
import { Campus } from '../../../../../shared/models/campus.model';
import { Segment } from '../../../../../shared/models/segment.model';
import { Location } from '../../../../../shared/models/location.model';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  @Input() public segment: Segment;
  private _locations: Location[];
  @Output() selectLocationEvent = new EventEmitter<Location>();
  @Output() createLocationEvent = new EventEmitter<Location>();

  constructor(private adminDataService: AdminDataService) {
  }

  ngOnInit() {
    this._locations = [];
    this.segment.locations.forEach(loc => {
      if (loc.id !== undefined) {
        this._locations.push(loc);
      }
    });
  }

  selectLocation(location) {
    this.selectLocationEvent.next(location);
  }

  createLocation() {
    this.createLocationEvent.next();
  }

  get locations() {
    return this._locations;
  }
}
