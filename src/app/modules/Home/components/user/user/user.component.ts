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
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getLocationById(this.user.checkin.location)
      .subscribe(loc => {
        this._location = loc;
      });
  }

  get location() {
    return this._location;
  }
}
