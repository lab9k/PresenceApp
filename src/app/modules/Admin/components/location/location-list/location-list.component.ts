import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { AdminDataService } from '../../../admin.service';
import { Campus } from '../../../../../shared/models/campus.model';
import { Segment } from '../../../../../shared/models/segment.model';
import { Location } from '../../../../../shared/models/location.model';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit, OnDestroy {

  @Input() public segment: Segment;
  private _locations: Location[];
  
  constructor(private dragulaService: DragulaService, private adminDataService: AdminDataService) { 
    dragulaService.dropModel.subscribe((value) => {
      if(value.slice()[0] === "bag-locations")
        this.onDropModel(value);
    });
  }

  ngOnInit() {
    this._locations = [];
    this.segment.locations.forEach(loc => {
      if(loc.id !== undefined)
        this._locations.push(loc);
    })
  }

  ngOnDestroy() {
  }

  private onDropModel(args) {
    if(this.segment.name !== "Locations without segment")
      this.adminDataService.updateSegment(this.segment).subscribe();
  }

  get locations() {
    return this._locations;
  }
}