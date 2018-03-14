import { Component, OnInit } from '@angular/core';
import { Location } from '../../../../shared/models/location.model';
import { CheckinService } from '../../checkin.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { Observable } from 'rxjs';
import { DataService } from '../../../../shared/services/data.service';

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

  constructor(private route: ActivatedRoute, private checkinService: CheckinService, private authService: AuthenticationService, private dataService: DataService) { }

  ngOnInit() {
    this.route.data.subscribe(item => {
      this._location = item['location'];
      if(this._location && this._location.id) {
        this.currentUser.subscribe(user => {
          this.checkinService.checkIn(this.authService.user.getValue() , this._location.stickers[0])
            .subscribe();
        });
      } else {
        this.dataService.locations().subscribe(items => this._locations = items);
      }
    });
  }

  createLoc() {
    this.locationName = $("input[name='new-location-name']").val();
    if(this.locationName.trim() !== "") {
      let location = new Location(null, this.locationName, this._location.stickers);
      this.checkinService.createLocation(location).subscribe(res => {
        window.location.reload();
      });
    }
  }

  addSticker() {
    let selectLocation = $("#selectLocation").find(":selected").val();
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
