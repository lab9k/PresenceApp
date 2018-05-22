import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '../../../../../shared/models/location.model';
import { AdminDataService } from '../../../admin.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Input() public location: Location;
  @Output() selectLocationEvent = new EventEmitter<Location>();

  constructor(private adminDataService: AdminDataService) { }

  ngOnInit() {
  }

  selected() {
    this.selectLocationEvent.next(this.location);
  }

  removeSticker(sticker) {
    if (confirm('Ben je zeker dat je sticker ' + sticker + ' wilt verwijderen van ' + this.location.name + '?')) {
      const index = this.location.stickers.indexOf(sticker, 0);
      if (index > -1) {
        this.location.stickers.splice(index, 1);
      }
      this.adminDataService.updateLocation(this.location).subscribe();
    }
  }
}
