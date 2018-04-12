import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../shared/models/user.model';
import { DataService } from '../../../../../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  private _user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(item => {
      this._user = item['user'];
    });
  }

  get user() {
    return this._user;
  }

}
