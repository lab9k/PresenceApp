import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../../../../../shared/models/location.model';
import { DragulaService } from 'ng2-dragula';
import { AdminDataService } from '../../../admin.service';

@Component({
  selector: 'app-sticker-list',
  templateUrl: './sticker-list.component.html',
  styleUrls: ['./sticker-list.component.css']
})
export class StickerListComponent implements OnInit {

  @Input() public location: Location;
  private _stickers: String[];

  constructor(private dragulaService: DragulaService, private adminDataService: AdminDataService) {
    dragulaService.dropModel.subscribe((value) => {
      if (value.slice()[0] === 'bag-stickers') {
        this.onDropModel(value);
      }
    });
  }

  ngOnInit() {
    this._stickers = [];
    this.location.stickers.forEach(st => {
      if (st !== undefined) {
        this._stickers.push(st);
      }
    });
  }

  private onDropModel(args) {
    if (this.location.name !== 'Stickers without location') {
      this.adminDataService.updateLocation(this.location).subscribe();
    }
  }

  get stickers() {
    return this._stickers;
  }

}
