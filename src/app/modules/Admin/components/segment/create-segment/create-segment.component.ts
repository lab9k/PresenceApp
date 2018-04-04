import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminDataService } from '../../../admin.service';
import { Segment } from '../../../../../shared/models/segment.model';

declare var $: any;

@Component({
  selector: 'app-create-segment',
  templateUrl: './create-segment.component.html',
  styleUrls: ['./create-segment.component.css']
})
export class CreateSegmentComponent implements OnInit {

  private segmentName: string;
  @Output() createSegmentEvent = new EventEmitter<string>();

    constructor(private adminDataService: AdminDataService) { }

    ngOnInit() {
    }

    createSegment() {
      this.segmentName = $('input[name=\'segment-name\']').val();
      if (this.segmentName.trim() !== '') {
        this.createSegmentEvent.next(this.segmentName);
      }
    }

}
