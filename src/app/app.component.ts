import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './shared/services/authentication.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    $('.ui.dropdown')
      .dropdown();
  }

  get currentUser(): Observable<string> {
    return this.authService.user;
  }

  drop() {
    $('.ui.dropdown')
    .dropdown();
  }

  onChange(theme) {
    console.log(theme);
    switch (theme) {
      case 'default':
        $('#theme').attr('href', 'assets/semantic.min.css');
        break;
      default:
        $('#theme').attr('href', 'assets/semantic.' + theme + '.min.css');
        break;
    }
  }

  get correctIp() {
    return this._correctIp;
  }

  onActivate(componentRef) {
    this._campusList = componentRef;
  }

  filter(event) {
    this._campusList.filter(event);
  }
}
