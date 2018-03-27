import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RegisterComponent } from './components/register/register.component';
import { RegisterResolver } from './register-resolver';

const routes = [
  { path: '', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register/:phoneid', component: RegisterComponent, resolve: { phoneid: RegisterResolver} },
];

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ],
  providers: [
    RegisterResolver
  ]
})
export class LoginModule { }