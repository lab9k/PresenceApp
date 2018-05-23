import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '../../../../../shared/models/location.model';
import { AdminDataService } from '../../../admin.service';

declare var $: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Input() public location: Location;
  @Output() selectLocationEvent = new EventEmitter<Location>();
  private selectedSticker: any;

  constructor(private adminDataService: AdminDataService) { }

  ngOnInit() {
  }

  selected() {
    this.selectLocationEvent.next(this.location);
  }

  removeSticker(sticker) {
    this.selectedSticker = sticker;
    $('.mini.modal' + '#' + sticker)
      .modal('setting', 'closable', false)
      .modal('show');
  }

  deleteConfirm() {
    const index = this.location.stickers.indexOf(this.selectedSticker, 0);
    if (index > -1) {
      this.location.stickers.splice(index, 1);
    }
    this.adminDataService.updateLocation(this.location).subscribe();
  }

  deleteDeny() {

  }
}
