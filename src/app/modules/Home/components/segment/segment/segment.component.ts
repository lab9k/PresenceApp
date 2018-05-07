import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Segment } from '../../../../../shared/models/segment.model';
import { User } from '../../../../../shared/models/user.model';
import { Checkin } from '../../../../../shared/models/checkin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentComponent implements OnInit {

  @Input() public segment: Segment;
  @Input() public users: User[];

  constructor(private router: Router) { }

  ngOnInit() {

  }

  addDummy() {
    const name = Math.random().toString(36).substring(7);
    const checkin = new Checkin(+new Date(), this.segment.locations[0]);
    const birthday = Math.floor(Math.random() * 70 + 1930) + '-' + Math.ceil(Math.random() * 12) + '-' + Math.ceil(Math.random() * 30);
    const user = new User(null, name, checkin, null, null, null, null, null, birthday);
    this.users.push(user);
    this.users = this.users.slice(0);
  }

  selectSegment() {
    this.router.navigate(['/segment', this.segment.id]);
  }

}
