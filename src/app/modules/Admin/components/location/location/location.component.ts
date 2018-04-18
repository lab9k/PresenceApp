import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '../../../../../shared/models/location.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Input() public location: Location;
  @Output() selectLocationEvent = new EventEmitter<Location>();

  constructor() { }

  ngOnInit() {
  }

  selected() {
    this.selectLocationEvent.next(this.location);
  }

}
