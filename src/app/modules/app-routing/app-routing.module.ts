import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';
import { AdminGuardService } from './admin-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: '../Home/home.module#HomeModule'
    },
    {
        path: 'admin',
        canActivate: [ AdminGuardService ],
        loadChildren: '../Admin/admin.module#AdminModule'
    },
    {
        path: 'checkin',
        canActivate: [ AuthGuardService ],
        loadChildren: '../Checkin/checkin.module#CheckinModule'
    },
    {
        path: 'account',
        loadChildren: '../Login/login.module#LoginModule'
    },
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes,
            {preloadingStrategy: PreloadAllModules})
    ],
    declarations: [],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule { }
