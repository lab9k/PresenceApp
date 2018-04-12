import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { DataService } from '../../shared/services/data.service';

@Injectable()
export class UserResolver implements Resolve<User> {
    private _user: User;
    constructor(private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {

        return this.dataService.getUserById(route.params['id'])
            .map(item => {
                if (item) {
                    return item;
                }
                console.log(`Item was not found:}`);
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                return Observable.of(new User(route.params['id'], null, null, null, null, null, null, null));
            });
    }
 }
