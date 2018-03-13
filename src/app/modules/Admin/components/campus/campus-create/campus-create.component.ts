import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../../../admin.service';
import { Campus } from '../../../../../shared/models/campus.model';

declare var $: any;

@Component({
  selector: 'app-campus-create',
  templateUrl: './campus-create.component.html',
  styleUrls: ['./campus-create.component.css']
})
export class CampusCreateComponent implements OnInit {

  private campusName: string;

  constructor(private adminDataService: AdminDataService) { }

  ngOnInit() {
  }

  createCampus() {
    this.campusName = $("input[name='campus-name']").val();
    if(this.campusName.trim() !== "") {
      let campus = new Campus(null, this.campusName, []);
      this.adminDataService.createCampus(campus).subscribe();
    }

  }
}
