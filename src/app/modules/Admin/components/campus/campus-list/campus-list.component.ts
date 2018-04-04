import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Campus } from '../../../../../shared/models/campus.model';

@Component({
  selector: 'app-campus-list',
  templateUrl: './campus-list.component.html',
  styleUrls: ['./campus-list.component.css']
})
export class CampusListComponent implements OnInit {

  @Input() public campuses: Campus[];
  @Output() deleteCampusEvent = new EventEmitter<Campus>();
  @Output() updateCampusEvent = new EventEmitter<Campus>();

  constructor() { }

  ngOnInit() {
  }

  deleteCampus(campus) {
    this.deleteCampusEvent.next(campus);
  }

  updateCampus(campus) {
    this.updateCampusEvent.next(campus);
  }

}
