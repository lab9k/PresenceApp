import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminDataService } from '../../../admin.service';

declare var $: any;

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {

  private locationName: string;
  @Output() createSegmentEvent = new EventEmitter<string>();

    constructor(private adminDataService: AdminDataService) { }

    ngOnInit() {
    }

    createSLocation() {
      this.locationName = $('input[name=\'location-name\']').val();
      if (this.locationName.trim() !== '') {
        this.createSegmentEvent.next(this.locationName);
      }
    }

}
