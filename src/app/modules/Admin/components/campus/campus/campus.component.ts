import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Campus } from '../../../../../shared/models/campus.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {

  @Input() public campus: Campus;
  @Output() deleteCampusEvent = new EventEmitter<Campus>();
  @Output() updateCampusEvent = new EventEmitter<Campus>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleteCampusEvent.next(this.campus);
  }

  test(event, data) {
    event.target.blur();
    this.campus.name = data;
    this.updateCampusEvent.next(this.campus);
  }
}
