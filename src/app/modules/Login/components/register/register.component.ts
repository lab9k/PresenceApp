import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private _isRegistered: boolean;

  constructor(private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.route.data.subscribe(item => {
      this._isRegistered = !item['phoneid'];
    });
  }

  get isRegistered() {
    return this._isRegistered;
  }

}
