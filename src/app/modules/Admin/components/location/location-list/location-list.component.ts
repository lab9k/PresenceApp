import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { AdminDataService } from '../../../admin.service';
import { Campus } from '../../../../../shared/models/campus.model';
import { Segment } from '../../../../../shared/models/segment.model';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit, OnDestroy {

  @Input() public campus: Campus;
  private _segments: Segment[];
  private dropDragSubscription;
  private dropDropSubscription;
  private dropCancelSubscription;
  
  constructor(private dragulaService: DragulaService, private adminDataService: AdminDataService) { 
    this.dropDragSubscription = dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    this.dropDropSubscription = dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    this.dropCancelSubscription = dragulaService.cancel.subscribe((value) => {
      this.onCancel(value.slice(1));
    });
  }

  ngOnInit() {
    this._segments = [];
    this.campus.segments.forEach(seg => {
      this._segments.push(seg);
    })
  }

  ngOnDestroy() {
    this.dropDragSubscription.unsubscribe();
    this.dropDropSubscription.unsubscribe();
    this.dropCancelSubscription.unsubscribe();
  }

  //item removed
  private onDrag(args) {
    let [e, el] = args;
    if(el.id === this.campus.name) {
      let seg = this._segments.filter(segment =>
        segment.id === e.id)[0];
      let index = this._segments.indexOf(seg);
      this._segments.splice(index,1);
      //this.adminDataService.removeLocation(this.campus.name, loc.id).subscribe();
    }
  }
  
  //item dropped
  private onDrop(args) {
    let [e, el] = args;
    let l;
    if(el.id === this.campus.name) {
      
      /*this.adminDataService.getLocation(e.id).subscribe(items => {
        l = items;
        this._locations.push(l);
        this.adminDataService.addLocation(this.campus.name, l.id).subscribe();
      });
    */
    }
  }

  //item removed, but came back
  private onCancel(args) {
    let [e, el] = args;
    if(el.id === this.campus.name) {
      let l;
      /*this.adminDataService.getLocation(e.id).subscribe(items => {
        l = items;
        this._locations.push(l);
        this.adminDataService.addLocation(this.campus.name, l.id).subscribe();
      });*/
    }
  }

  get locations() {
    return this._segments;
  }
}