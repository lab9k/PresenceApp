import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../shared/services/authentication.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public auth2: any;

  constructor(private router:Router, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }




}
