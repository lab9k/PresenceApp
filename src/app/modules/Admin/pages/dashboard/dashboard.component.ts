import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver, HostListener } from '@angular/core';
import { Campus } from '../../../../shared/models/campus.model';
import { Location } from '../../../../shared/models/location.model';
import { AdminDataService } from '../../admin.service';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { DataService } from '../../../../shared/services/data.service';
import { Segment } from '../../../../shared/models/segment.model';
import { CampusComponent } from '../../components/campus/campus/campus.component';
import { CampusDetailComponent } from '../../components/campus/campus-detail/campus-detail.component';
import { SegmentDetailComponent } from '../../components/segment/segment-detail/segment-detail.component';
import { LocationDetailComponent } from '../../components/location/location-detail/location-detail.component';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  private _campuses: Campus[];
  public mobile: boolean;
  public orientation: String;

  @ViewChild('selectedElement', { read: ViewContainerRef })
  selectedElement;

  constructor(private _adminDataService: AdminDataService, private dataService: DataService,
      private _componentFactoryResolver: ComponentFactoryResolver) {
    }

  ngOnInit() {
    if (window.innerWidth <= 768) { // 768px portrait
      this.mobile = true;
      this.orientation = 'vertical';
    } else {
      this.mobile = false;
      this.orientation = 'horizontal';
    }
    this.dataService.campuses()
      .subscribe(items => {
        this._campuses = items;
      });

      $('.ui.accordion').accordion({ exclusive: true });
      $('.ui.buttons .button').on('click', function() {
        $(this).addClass('positive')
              .siblings()
              .removeClass('positive');
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 768) { // 768px portrait
      this.mobile = true;
      this.orientation = 'vertical';
    } else {
      this.mobile = false;
      this.orientation = 'horizontal';
    }
  }

  get campuses() {
    return this._campuses;
  }

  createCampus() {
    const campus = new Campus(null, 'New Campus', false, false, 1, []);
    this._adminDataService.createCampus(campus).subscribe(res => {
      this._campuses.push(res);
    });
  }

  createSegment(campus) {
    const segment = new Segment(null, 'New Segment', false, 1, []);
    const index = this._campuses.indexOf(campus, 0);
    this._adminDataService.createSegment(segment).subscribe(res => {
      this._campuses[index].addSegment(res);
      this._adminDataService.updateCampus(this._campuses[index]).subscribe();
    });
  }

  createLocation(segment) {
    const location = new Location(null, 'New Location', 1, [], false);
    this._campuses.forEach(c => {
      if (c.segments.includes(segment)) {
        const index = c.segments.indexOf(segment, 0);
        this._adminDataService.createLocation(location).subscribe(res => {
          c.segments[index].addLocation(res);
          this._adminDataService.updateSegment(c.segments[index]).subscribe();
        });
      }
    });
  }

  deleteCampus(campus) {
    const index = this._campuses.indexOf(campus, 0);
    if (index > -1) {
      this._campuses.splice(index, 1);
    }
    this._adminDataService.deleteCampus(campus).subscribe();
  }

  selectCampus(campus) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(CampusDetailComponent);
    const viewContainerRef = this.selectedElement;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.campus = campus;
    componentRef.instance.isDeleted.subscribe(res => {
      if (res) {
        const index = this._campuses.indexOf(campus, 0);
        if (index > -1) {
          this._campuses.splice(index, 1);
        }
      }
    });
    const yourComponentType1Instance = (<CampusDetailComponent>componentRef.instance);
  }

  selectSegment(segment) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(SegmentDetailComponent);
    const viewContainerRef = this.selectedElement;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.segment = segment;
    componentRef.instance.isDeleted.subscribe(res => {
      if (res) {
        this._campuses.forEach(c => {
          if (c.segments.includes(segment)) {
            const index = c.segments.indexOf(segment, 0);
            if (index > -1) {
              c.segments.splice(index, 1);
            }
          }
        });
      }
    });
    const yourComponentType1Instance = (<SegmentDetailComponent>componentRef.instance);
  }

  selectLocation(location) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(LocationDetailComponent);
    const viewContainerRef = this.selectedElement;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.location = location;
    componentRef.instance.isDeleted.subscribe(res => {
      if (res) {
        this._campuses.forEach(c => {
          c.segments.forEach(s => {
            if (s.locations.includes(location)) {
              const index = s.locations.indexOf(location, 0);
              if (index > -1) {
                s.locations.splice(index, 1);
              }
            }
          });
        });
      }
    });
    const yourComponentType1Instance = (<LocationDetailComponent>componentRef.instance);
  }

}
