import { Component, OnInit } from '@angular/core';
import { Campus } from '../../../../../shared/models/campus.model';
import { AdminDataService } from '../../../admin.service';
import { Subject } from 'rxjs/Subject';

declare var $: any;

@Component({
  selector: 'app-campus-detail',
  templateUrl: './campus-detail.component.html',
  styleUrls: ['./campus-detail.component.css']
})
export class CampusDetailComponent implements OnInit {

  public campus: Campus;
  private isDeleted: Subject<boolean> = new Subject();

  constructor(private adminDataService: AdminDataService) { }

  ngOnInit() {
  }

  onSubmit(event) {
    $('button[name=\'submit-button\']').addClass('loading');
    this.adminDataService.updateCampus(this.campus).subscribe(res  => {
      $('button[name=\'submit-button\']').removeClass('loading');
    });
  }

  deleteCampus() {
    $('button[name=\'delete-button\']').addClass('loading');
    this.adminDataService.deleteCampus(this.campus).subscribe(res  => {
      this.isDeleted.next(true);
      this.campus = undefined;
      $('button[name=\'delete-button\']').removeClass('loading');
    });
  }
}
