import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './modules/app-routing/components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { LoginComponent } from './modules/Login/components/login/login.component';
import { HttpModule } from '@angular/http';
import { AuthenticationService } from './shared/services/authentication.service';
import { AuthGuardService } from './modules/app-routing/auth-guard.service';
import { LocationComponent } from './modules/Checkin/components/location/location.component';
import { DataService } from './shared/services/data.service';
import { DragulaModule } from 'ng2-dragula/components/dragular.module';
import { AdminGuardService } from './modules/app-routing/admin-guard.service';
import { AdminDataService } from './modules/Admin/admin.service';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DragulaModule,
    AppRoutingModule,
    AvatarModule
  ],
  providers: [
    AuthenticationService,
    DataService,
    AdminDataService,
    AuthGuardService,
    AdminGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
