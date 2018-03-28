import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Campus } from '../../../../../shared/models/campus.model';
import { Segment } from '../../../../../shared/models/segment.model';
import { DragulaService } from 'ng2-dragula';
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
  
  constructor(private dragulaService: DragulaService, private adminDataService: AdminDataService, private dataService: DataService) { 
    dragulaService.dropModel.subscribe((value) => {
      if(value.slice()[0] === "bag-segments")
        this.onDropModel(value);
    });
  }

  ngOnInit() {
    this._segments = [];
    this.campus.segments.forEach(seg => {
      if(seg.id !== undefined){
        this._segments.push(seg);
      }
      else {
        this.campus.segments.pop();
      }
    });
  }

  ngOnDestroy() {
  }

  private onDropModel(args) {
    if(this.campus.name !== "Segments without campus")
      this.adminDataService.updateCampus(this.campus).subscribe();
  }

  get segments() {
    return this._segments;
  }
}
