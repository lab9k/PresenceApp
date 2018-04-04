import { Segment } from './segment.model';

export class Campus {
    private _id: string;
    private _name: string;
    private _segments: Segment[];

    static fromJSON(json) {
        const segs = [];
        json.segments.forEach(element => {
            segs.push(Segment.fromJSON(element));
        });
        const campus = new Campus(json._id, json.name, segs);
        return campus;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            segments: this._segments
        };
    }

    constructor(id: string, name: string, segments: Segment[]) {
        this._id = id;
        this._name = name;
        this._segments = segments;
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

    get segments() {
        return this._segments;
    }

    addSegment(seg: Segment) {
        if (this._segments === undefined) {
            this._segments = [];
        }
        this._segments.push(seg);
    }

    removeSegment(seg: Segment) {
        const index = this._segments.indexOf(seg);
        if (index !== -1)  {
            this._segments.splice(index, 1);
        }
    }
}
