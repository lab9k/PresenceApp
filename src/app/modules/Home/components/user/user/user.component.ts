import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../../shared/models/user.model';
import { DataService } from '../../../../../shared/services/data.service';
import { Location } from '../../../../../shared/models/location.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() public user: User;
  private _location: Location;
  private _color: String;
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getLocationById(this.user.checkin.location)
      .subscribe(loc => {
        this._location = loc;
      });
    let diff = +new Date() - this.user.checkin.time;
    if(diff <= 60000 * 30) {
      this._color = "green";
    }
    else if(diff <= 60000 * 60) {
      this._color = "olive";
    }
    else if(diff <= 60000 * 120) {
      this._color = "yellow";
    }
    else {
      this._color = "red";
    }
  }

  get location() {
    return this._location;
  }

  get color() {
    return this._color;
  }
}
