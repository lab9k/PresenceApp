import { Component, OnInit, OnDestroy } from '@angular/core';
import { Campus } from '../../../../shared/models/campus.model';
import { Location } from '../../../../shared/models/location.model';
import { AdminDataService } from '../../admin.service';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { DataService } from '../../../../shared/services/data.service';
import { Segment } from '../../../../shared/models/segment.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _campuses: Campus[];
  private _campus: Campus;
  private _segments: Segment[];
  private _segment: Segment;
  private _locations: Location[];
  private _location: Location;

  constructor(private _adminDataService: AdminDataService, private dataService: DataService, private dragulaService: DragulaService) {
    this.dragulaService.setOptions('bag-segments', {
      accepts: function (el, container, handle) {
        return container.id !== 'Segments without campus';
      }
    });
    this.dragulaService.setOptions('bag-locations', {
      accepts: function (el, container, handle) {
        return container.id !== 'Locations without segment';
      }
    });
    this.dragulaService.setOptions('bag-stickers', {
      accepts: function (el, container, handle) {
        return container.id !== 'Stickers without location';
      }
    });
  }

  ngOnInit() {
    this._campus = new Campus(null, 'Segments without campus', []);
    this._segment = new Segment(null, 'Locations without segment', []);
    this._location = new Location(null, 'Stickers without location', []);

    this.dataService.campuses()
      .subscribe(items => {
        this._campuses = items;
        this.dataService.segments().subscribe(segments => {
          this._segments = segments;
          segments.forEach(segment => {
            this._campus.segments.push(segment);
            this._campuses.forEach(cmp => {
              if (cmp.segments.find(x => x.id === segment.id)) {
                this._campus.segments.pop();
              }
            });
          });
          this.dataService.locations().subscribe(locations => {
            this._locations = locations;
            locations.forEach(location => {
              this._segment.locations.push(location);
              this._segments.forEach(seg => {
                if (seg.locations.find(x => x.id === location.id)) {
                  this._segment.locations.pop();
                }
              });
            });
          });
        });
      });

  }

  ngOnDestroy() {
    this.dragulaService.destroy('bag-segments');
    this.dragulaService.destroy('bag-locations');
    this.dragulaService.destroy('bag-stickers');
  }

  get campuses() {
    return this._campuses;
  }

  get campus() {
    return this._campus;
  }

  get segments() {
    return this._segments;
  }

  get segment() {
    return this._segment;
  }

  get locations() {
    return this._locations;
  }

  get location() {
    return this._location;
  }

  createCampus(name) {
    const campus = new Campus(null, name, []);
    this._adminDataService.createCampus(campus).subscribe(res => {
      this._campuses.push(res);
    });
  }

  updateCampus(campus) {
    this._adminDataService.updateCampus(campus).subscribe(res => {
      const index = this._campuses.indexOf(campus, 0);
      if (index > -1) {
        this._campuses.splice(index, 1);
      }
      this._campuses.push(campus);
    });
  }

  deleteCampus(campus) {
    const index = this._campuses.indexOf(campus, 0);
    if (index > -1) {
      this._campuses.splice(index, 1);
    }
    this._adminDataService.deleteCampus(campus).subscribe();
  }

  createSegment(name) {
    const segment = new Segment(null, name, []);
    this._adminDataService.createSegment(segment).subscribe(res => {
      this._segments.push(res);
    });
  }

  deleteSegment(segment) {
    const index = this._segments.indexOf(segment, 0);
    if (index > -1) {
      this._segments.splice(index, 1);
    }
    this._adminDataService.deleteSegment(segment).subscribe();
  }

}
