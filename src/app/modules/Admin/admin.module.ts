import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AdminDataService } from './admin.service';
import { CampusComponent } from './components/campus/campus/campus.component';
import { CampusListComponent } from './components/campus/campus-list/campus-list.component';
import { LocationComponent } from './components/location/location/location.component';
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DragulaModule } from 'ng2-dragula';
import { SegmentComponent } from './components/segment/segment/segment.component';
import { SegmentListComponent } from './components/segment/segment-list/segment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampusDetailComponent } from './components/campus/campus-detail/campus-detail.component';
import { SegmentDetailComponent } from './components/segment/segment-detail/segment-detail.component';
import { LocationDetailComponent } from './components/location/location-detail/location-detail.component';

const routes = [
  { path: '', component:  DashboardComponent},
];

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DragulaModule
  ],
  declarations: [
    CampusComponent,
    CampusListComponent,
    LocationComponent,
    LocationListComponent,
    DashboardComponent,
    SegmentComponent,
    SegmentListComponent,
    CampusDetailComponent,
    SegmentDetailComponent,
    LocationDetailComponent
  ],
  providers: [
    AdminDataService
  ],
  entryComponents: [
    CampusDetailComponent,
    SegmentDetailComponent,
    LocationDetailComponent
  ]
})
export class AdminModule { }
