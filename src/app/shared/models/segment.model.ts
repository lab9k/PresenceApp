import { Location } from './location.model';

export class Segment {
    private _id: string;
    private _name: string;
    private _weight: number;
    private _isVergadering: boolean;
    private _locations: Location[];

    static fromJSON(json) {
        const locs = [];
        json.locations.forEach(element => {
            locs.push(Location.fromJSON(element));
        });
        const segment = new Segment(json._id, json.name, json.isVergadering, json.weight, locs);
        return segment;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            isVergadering: this._isVergadering,
            weight: this._weight,
            locations: this._locations
        };
    }

    constructor(id: string, name: string, isVergadering: boolean, weight: number, locations: Location[]) {
        this._id = id;
        this._name = name;
        this._isVergadering = isVergadering;
        this._weight = weight;
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

    set locations(locations) {
        this._locations = locations;
    }

    get isVergadering() {
        return this._isVergadering;
    }

    set isVergadering(isVergadering) {
        this._isVergadering = isVergadering;
    }

    get weight() {
        return this._weight;
    }

    set weight(weight) {
        this._weight = weight;
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
