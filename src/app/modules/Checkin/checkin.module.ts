import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LocationComponent } from './components/location/location.component';
import { CheckinService } from './checkin.service';
import { LocationResolver } from './location-resolver.service';
import { CheckinComponent } from './components/checkin/checkin.component';

const routes = [
  { path: ':id', component: LocationComponent, resolve: { location: LocationResolver} },
  { path: '', component: CheckinComponent }
];

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LocationComponent,
    CheckinComponent
  ],
  providers: [
    CheckinService,
    LocationResolver
  ]
})
export class CheckinModule { }
