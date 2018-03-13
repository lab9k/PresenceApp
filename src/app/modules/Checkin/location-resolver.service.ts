import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Location } from '../../shared/models/location.model';
import { DataService } from '../../shared/services/data.service';

@Injectable()
export class LocationResolver implements Resolve<Location> {
    private _location: Location;
    constructor(private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Location> {
                
        return this.dataService.getLocationWithSticker(route.params['id'])
            .map(item => {
                if (item) {
                    return item;
                }
                console.log(`Item was not found:}`);
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                return Observable.of(new Location(null, null, [route.params['id']]));
            });    
    }
 }