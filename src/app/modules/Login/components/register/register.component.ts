import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private _isRegistered: boolean;
  private _loggedIn: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticationService) { 
    
  }

  ngOnInit() {
    this.route.data.subscribe(item => {
      this._isRegistered = item['phoneid'];
      this.authService.isLoggedIn().subscribe(res => {
        this._loggedIn = res;
      });
    });
  }

  get isRegistered() {
    return this._isRegistered;
  }

  get loggedIn() {
    return this._loggedIn;
  }

}
