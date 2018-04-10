import { User } from './user.model';
import { Location } from './location.model';

export class Checkin {
    private _time: number;
    private _location: Location;

    static fromJSON(json): Checkin {
        let location;
        if (json.location !== undefined) {
            location = Location.fromJSON(json.location);
        }
        const checkin = new Checkin(json.time, location);
        return checkin;
    }

    constructor(time: number, location: Location) {
        this._time =  time;
        this._location = location;
    }

    get time() {
        return this._time;
    }

    get location() {
        return this._location;
    }

    set location(location) {
        this._location = location;
    }
}
