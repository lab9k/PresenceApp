import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Segment } from '../../shared/models/segment.model';
import { DataService } from '../../shared/services/data.service';

@Injectable()
export class SegmentResolver implements Resolve<Segment> {

    constructor(private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Segment> {

        return this.dataService.getSegmentById(route.params['id'])
            .map(item => {
                if (item) {
                    return item;
                }
                console.log(`Item was not found:}`);
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                return Observable.of(new Segment(route.params['id'], null, null, null, null));
            });
    }
 }
