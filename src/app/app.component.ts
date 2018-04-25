import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './shared/services/authentication.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminDataService } from './modules/Admin/admin.service';

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

  constructor(private authService: AuthenticationService, private router: Router, private dataService: AdminDataService) {
  }

  ngOnInit() {
    $('#themeDrop.ui.dropdown')
      .dropdown();
    this.authService.getCurrentUser().subscribe(res => {
      if (res !== null && (res.theme !== '' && res.theme !== 'default')) {
        $('#theme').attr('href', 'assets/semantic.' + res.theme + '.min.css');
      }
    });
  }

  get currentUser(): Observable<string> {
    return this.authService.user;
  }

  drop() {
    $('#menuDrop.ui.dropdown')
    .dropdown();
  }

  onChange(theme) {
    switch (theme) {
      case 'default':
        $('#theme').attr('href', 'assets/semantic.min.css');
        break;
      default:
        $('#theme').attr('href', 'assets/semantic.' + theme + '.min.css');
        break;
    }
    this.authService.getCurrentUser().subscribe(res => {
      res.theme = theme;
      this.dataService.updateUser(res).subscribe();
    });
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
