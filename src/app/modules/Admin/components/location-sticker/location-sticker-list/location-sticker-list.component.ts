import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '../../../../../shared/models/location.model';

@Component({
  selector: 'app-location-sticker-list',
  templateUrl: './location-sticker-list.component.html',
  styleUrls: ['./location-sticker-list.component.css']
})
export class LocationStickerListComponent implements OnInit {

  @Input() public locations: Location[];
  @Output() deleteLocationEvent = new EventEmitter<Location>();

  constructor() { }

  ngOnInit() {
  }

  deleteLocation(location) {
    this.deleteLocationEvent.next(location);
  }

}
