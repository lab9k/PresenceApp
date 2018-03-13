import { Component, OnInit, OnDestroy } from '@angular/core';
import { Campus } from '../../../../shared/models/campus.model';
import { Location } from '../../../../shared/models/location.model';
import { AdminDataService } from '../../admin.service';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { DataService } from '../../../../shared/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _campuses: Campus[];
  private _campus: Campus;

  constructor(private _adminDataService: AdminDataService, private dataService: DataService, private dragulaService: DragulaService) { 
    this.dragulaService.setOptions('bag-segments', {
      accepts: function (el, container, handle) {
        return container.id !== "Segments without campus";
      }
    });
  }

  ngOnInit() {
    this._campus = new Campus(null, "Segments without campus", []);
    this.dataService.campuses()
      .subscribe(items => {
        this._campuses = items;
        this.dataService.segments().subscribe(segments => {
          segments.forEach(segment => {
            this._campus.segments.push(segment);
            this._campuses.forEach(cmp => {
              if(cmp.segments.find(x => x.id === segment.id)) {
                this._campus.segments.pop();
              }
            });
          });
        });
      });
  }

  ngOnDestroy() {
    this.dragulaService.destroy('bag-segments');
  }

  get campuses() {
    return this._campuses;
  }

  get campus() {
    return this._campus;
  }

}
