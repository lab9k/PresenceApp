import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Campus } from '../../shared/models/campus.model';
import { DataService } from '../../shared/services/data.service';

@Injectable()
export class CampusResolver implements Resolve<Campus> {
    private _campus: Campus;
    constructor(private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Campus> {

        return this.dataService.getCampusById(route.params['id'])
            .map(item => {
                if (item) {
                    return item;
                }
                console.log(`Item was not found:}`);
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                return Observable.of(new Campus(route.params['id'], null, null, null, null, null));
            });
    }
 }
