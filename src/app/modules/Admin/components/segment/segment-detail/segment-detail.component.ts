import { Component, OnInit } from '@angular/core';
import { Segment } from '../../../../../shared/models/segment.model';
import { AdminDataService } from '../../../admin.service';
import { Subject } from 'rxjs/Subject';

declare var $: any;

@Component({
  selector: 'app-segment-detail',
  templateUrl: './segment-detail.component.html',
  styleUrls: ['./segment-detail.component.css']
})
export class SegmentDetailComponent implements OnInit {

  public segment: Segment;
  private isDeleted: Subject<boolean> = new Subject();

  constructor(private adminDataService: AdminDataService) { }

  ngOnInit() {
  }

  onSubmit() {
    $('button[name=\'submit-button\']').addClass('loading');
    this.adminDataService.updateSegment(this.segment).subscribe(res => {
      $('button[name=\'submit-button\']').removeClass('loading');
    });
  }

  deleteSegment() {
    $('button[name=\'delete-button\']').addClass('loading');
    this.adminDataService.deleteSegment(this.segment).subscribe(res  => {
      this.isDeleted.next(true);
      this.segment = undefined;
      $('button[name=\'delete-button\']').removeClass('loading');
    });
  }
}
