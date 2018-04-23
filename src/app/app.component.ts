import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './shared/services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  private _currentUser: string;
  private _correctIp: boolean;

  constructor(private authService: AuthenticationService) {
  }

  get currentUser(): Observable<string> {
    return this.authService.user;
  }

  drop() {
    $('.ui.dropdown')
    .dropdown();
  }

  get correctIp() {
    return this._correctIp;
  }
}
