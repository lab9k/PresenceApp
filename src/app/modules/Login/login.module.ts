import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RegisterComponent } from './components/register/register.component';
import { RegisterResolver } from './register-resolver';
import { ProfileComponent } from './components/profile/profile.component';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register/:phoneid', component: RegisterComponent, resolve: { phoneid: RegisterResolver} },
  { path: 'profile', component:  ProfileComponent},
];

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  providers: [
    RegisterResolver
  ]
})
export class LoginModule { }
