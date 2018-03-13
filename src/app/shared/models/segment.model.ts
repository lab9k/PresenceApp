import { Location } from './location.model'

export class Segment {
    private _id: string;
    private _name: string;
    private _locations: Location[]; 

    static fromJSON(json) {
        let locs = [];
        json.locations.forEach(element => {
            locs.push(Location.fromJSON(element));
        });
        const segment = new Segment(json._id, json.name, locs);
        return segment;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            locations: this._locations.forEach(location => {
                location.toJSON()
            }),
        }
    }

    constructor(id: string, name: string, locations: Location[]) {
        this._id = id;
        this._name = name;
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

    addLocation(loc: Location) {
        this._locations.push(loc);
    }

    removeLocation(loc: Location) {
        const index = this._locations.indexOf(loc);
        if(index !== -1)  {
            this._locations.splice(index, 1);
        }
    }
}