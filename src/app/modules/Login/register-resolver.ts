import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Injectable()
export class RegisterResolver implements Resolve<boolean> {

    constructor(private authService: AuthenticationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.register(route.params['phoneid'])
            .map(item => {
                if (item) {
                    return item;
                }
                console.log(`Item was not found:}`);
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                return Observable.of(false);
            });
    }
 }
