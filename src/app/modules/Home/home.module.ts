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
import { ProfileComponent } from './components/user/profile/profile.component';

const routes = [
  { path: '', component: CampusListComponent },
  { path: 'profile', component:  ProfileComponent},
];

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CampusListComponent,
    CampusComponent,
    UserListComponent,
    UserComponent,
    SegmentComponent,
    SegmentListComponent,
    ProfileComponent
  ],
  providers: [
    HomeDataService
  ]
})
export class HomeModule { }
