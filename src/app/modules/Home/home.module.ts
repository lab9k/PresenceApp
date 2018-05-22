import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HomeDataService } from './home.service';
import { CampusListComponent } from './components/campus/campus-list/campus-list.component';
import { CampusComponent } from './components/campus/campus/campus.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserComponent } from './components/user/user/user.component';
import { SegmentComponent } from './components/segment/segment/segment.component';
import { SegmentListComponent } from './components/segment/segment-list/segment-list.component';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { CampusDetailComponent } from './components/campus/campus-detail/campus-detail.component';
import { CampusResolver } from './campus-resolver.service';
import { SegmentDetailComponent } from './components/segment/segment-detail/segment-detail.component';
import { SegmentResolver } from './segment-resolver.service';
import { AvatarModule } from 'ngx-avatar';
import { OverOnsComponent } from './components/over-ons/over-ons.component';

const routes = [
  { path: '', component: CampusListComponent },
  { path: 'campus/:id', component: CampusDetailComponent, resolve: {campus: CampusResolver}},
  { path: 'segment/:id', component: SegmentDetailComponent, resolve: {segment: SegmentResolver}},
  { path: 'Over ons', component: OverOnsComponent}
];

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    RouterModule.forChild(routes),
    AvatarModule
  ],
  declarations: [
    CampusListComponent,
    CampusComponent,
    UserListComponent,
    UserComponent,
    SegmentComponent,
    SegmentListComponent,
    CampusDetailComponent,
    SegmentDetailComponent,
    OverOnsComponent
  ],
  providers: [
    HomeDataService,
    AuthenticationService,
    CampusResolver,
    SegmentResolver
  ]
})
export class HomeModule { }
