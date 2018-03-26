import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { User } from '../../../../shared/models/user.model';
import { AdminDataService } from '../../admin.service';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _user: User;
  
  constructor(private authService: AuthenticationService, private adminDataService: AdminDataService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(res => {
      this._user = res;
    });
  }

  save() {
    let phoneid = $("input[name='phoneid']").val();
    if(phoneid.trim() !== "") {
      this._user.phoneid = phoneid;
      console.log(this._user);
      this.adminDataService.updateUser(this._user).subscribe();
    }
  }

  get user() {
    return this._user;
  }
}
