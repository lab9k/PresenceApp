import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { User } from '../../../../shared/models/user.model';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _user: User;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(res => {
      if (res !== null) {
        this._user = res;
      } else {
        this.router.navigate(['/account/login']);
      }
    });
  }

  get user() {
    return this._user;
  }

  deletePhoneId() {
    this._user.phoneid = undefined;
    console.log(this._user);
    this.authService.removePhone(this._user).subscribe();
  }
}
