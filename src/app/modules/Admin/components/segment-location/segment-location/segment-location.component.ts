import { Component, OnInit, Input } from '@angular/core';
import { Segment } from '../../../../../shared/models/segment.model';
import { AdminDataService } from '../../../admin.service';

@Component({
  selector: 'app-segment-location',
  templateUrl: './segment-location.component.html',
  styleUrls: ['./segment-location.component.css']
})
export class SegmentLocationComponent implements OnInit {

  @Input() public segment: Segment;
  
  constructor(private adminService: AdminDataService) { }

  ngOnInit() {
  }

  delete() {
    this.adminService.deleteSegment(this.segment).subscribe();
    location.reload();
  }
}
