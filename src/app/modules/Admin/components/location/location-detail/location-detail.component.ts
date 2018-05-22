import { Component, OnInit } from '@angular/core';
import { Location } from '../../../../../shared/models/location.model';
import { AdminDataService } from '../../../admin.service';
import { Subject } from 'rxjs/Subject';

declare var $: any;

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  public location: Location;
  private isDeleted: Subject<boolean> = new Subject();

  constructor(private adminDataService: AdminDataService) { }

  ngOnInit() {
  }

  onSubmit() {
    $('button[name=\'submit-button\']').addClass('loading');
    this.adminDataService.updateLocation(this.location).subscribe(res  => {
      $('button[name=\'submit-button\']').removeClass('loading');
    });
  }

  deleteLocation() {
    if (confirm('Ben je zeker dat je locatie ' + this.location.name + ' wilt verwijderen?')) {
      $('button[name=\'delete-button\']').addClass('loading');
        this.adminDataService.deleteLocation(this.location).subscribe(res  => {
          this.isDeleted.next(true);
          this.location = undefined;
          $('button[name=\'delete-button\']').removeClass('loading');
      });
    }
  }
}
