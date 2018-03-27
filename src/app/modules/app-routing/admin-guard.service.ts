import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
          return this.authService.getCurrentUser().map(res => {
            if(res !== null && res.role === "admin") {
                return true
            }
            this.authService.redirectUrl = state.url;
            this.router.navigate(['/']);
            return false;
        });

      }
      
  constructor(private authService: AuthenticationService, private router: Router) { }

}
