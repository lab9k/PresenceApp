import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Campus } from '../../../../../shared/models/campus.model';

declare var $: any;

@Component({
  selector: 'app-campus-create',
  templateUrl: './campus-create.component.html',
  styleUrls: ['./campus-create.component.css']
})
export class CampusCreateComponent implements OnInit {

  private campusName: string;
  @Output() createCampusEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  createCampus() {
    this.campusName = $('input[name=\'campus-name\']').val();
    if (this.campusName.trim() !== '') {
      this.createCampusEvent.next(this.campusName);
    }

  }
}
