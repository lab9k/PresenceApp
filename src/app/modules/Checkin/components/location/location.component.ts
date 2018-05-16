import { Component, OnInit } from '@angular/core';
import { Location } from '../../../../shared/models/location.model';
import { CheckinService } from '../../checkin.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../../../shared/services/data.service';
import * as io from 'socket.io-client';

declare var $: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  private _location: Location;
  private locationName: string;
  private _locations: Location[];

  socket = io();

  constructor(private route: ActivatedRoute, private checkinService: CheckinService,
    private authService: AuthenticationService, private dataService: DataService) { }

  ngOnInit() {
    this.route.data.subscribe(item => {
      this._location = item['location'];
      if (this._location && this._location.id) {
        this.currentUser.subscribe(user => {
          this.checkinService.saveCheckin(this.authService.user.getValue(), this.location.stickers[0]).then((result) => {
            this.socket.emit('checkin', result);
          }, (err) => {
            console.log(err);
          });
        });
      } else {
        this.dataService.locations().subscribe(items => this._locations = items);
      }
    });
  }

  createLoc() {
    this.locationName = $('input[name=\'new-location-name\']').val();
    const doNotDisturb = $('input[name=\'doNotDisturb\']').is(':checked');
    const weight = $('input[name=\'new-location-name\']').val();
    if (this.locationName.trim() !== '') {
      const location = new Location(null, this.locationName, weight, this._location.stickers, doNotDisturb);
      this.checkinService.createLocation(location).subscribe(res => {
        window.location.reload();
      });
    }
  }

  addSticker() {
    const selectLocation = $('#selectLocation').find(':selected').val();
    this.dataService.getLocationById(selectLocation).subscribe(item => {
      item.addSticker(this._location.stickers[0]);
      this.checkinService.updateLocation(item).subscribe(res => {
        window.location.reload();
      });
    });
  }

  get currentUser(): Observable<string> {
    return this.authService.user;
  }

  get location() {
    return this._location;
  }

  get locations() {
    return this._locations;
  }
}
