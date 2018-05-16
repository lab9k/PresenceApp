import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './shared/services/authentication.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _currentUser: string;
  private _correctIp: boolean;
  private _campusList: any;

  constructor(private authService: AuthenticationService, private _router: Router) {
  }

  ngOnInit() {
    $('.ui.dropdown').dropdown();
  }

  get currentUser(): Observable<string> {
    return this.authService.user;
  }

  get correctIp() {
    return this._correctIp;
  }

  get router() {
    return this._router;
  }

  onActivate(componentRef) {
    this._campusList = componentRef;
  }

  filter(event) {
    this._campusList.filter(event);
  }
}
