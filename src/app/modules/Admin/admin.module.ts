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
import { CampusCreateComponent } from './components/campus/campus-create/campus-create.component';
import { SegmentComponent } from './components/segment/segment/segment.component';
import { SegmentListComponent } from './components/segment/segment-list/segment-list.component';
import { SegmentLocationComponent } from './components/segment-location/segment-location/segment-location.component';
import { SegmentLocationListComponent } from './components/segment-location/segment-location-list/segment-location-list.component';
import { CreateSegmentComponent } from './components/segment/create-segment/create-segment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateLocationComponent } from './components/location/create-location/create-location.component';
import { LocationStickerComponent } from './components/location-sticker/location-sticker/location-sticker.component';
import { LocationStickerListComponent } from './components/location-sticker/location-sticker-list/location-sticker-list.component';
import { StickerComponent } from './components/sticker/sticker/sticker.component';
import { StickerListComponent } from './components/sticker/sticker-list/sticker-list.component';

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
    CampusCreateComponent,
    SegmentComponent,
    SegmentListComponent,
    SegmentLocationComponent,
    SegmentLocationListComponent,
    CreateSegmentComponent,
    CreateLocationComponent,
    LocationStickerComponent,
    LocationStickerListComponent,
    StickerComponent,
    StickerListComponent
  ],
  providers: [
    AdminDataService
  ],
})
export class AdminModule { }
