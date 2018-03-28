import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';
import { User } from '../../../../../shared/models/user.model';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _user: User;
  
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(res => {
      this._user = res;
    });
  }

  get user() {
    return this._user;
  }
}
