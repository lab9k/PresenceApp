import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '../../../../../shared/models/location.model';

@Component({
  selector: 'app-location-sticker',
  templateUrl: './location-sticker.component.html',
  styleUrls: ['./location-sticker.component.css']
})
export class LocationStickerComponent implements OnInit {

  @Input() public location: Location;
  @Output() deleteLocationEvent = new EventEmitter<Location>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleteLocationEvent.next(this.location);
  }

}
