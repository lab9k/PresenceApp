import { Location } from './location.model';

export class Segment {
    private _id: string;
    private _name: string;
    private _isVergadering: boolean;
    private _locations: Location[];

    static fromJSON(json) {
        const locs = [];
        json.locations.forEach(element => {
            locs.push(Location.fromJSON(element));
        });
        const segment = new Segment(json._id, json.name, json.isVergadering, locs);
        return segment;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            isVergadering: this._isVergadering,
            locations: this._locations
        };
    }

    constructor(id: string, name: string, isVergadering: boolean, locations: Location[]) {
        this._id = id;
        this._name = name;
        this._isVergadering = isVergadering;
        this._locations = locations;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get locations() {
        return this._locations;
    }

    get isVergadering() {
        return this._isVergadering;
    }

    set isVergadering(isVergadering) {
        this._isVergadering = isVergadering;
    }

    addLocation(loc: Location) {
        this._locations.push(loc);
    }

    removeLocation(loc: Location) {
        const index = this._locations.indexOf(loc);
        if (index !== -1)  {
            this._locations.splice(index, 1);
        }
    }
}
