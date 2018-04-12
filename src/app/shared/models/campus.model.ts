import { Segment } from './segment.model';

export class Campus {
    private _id: string;
    private _name: string;
    private _isLunch: boolean;
    private _isThuiswerk: boolean;
    private _segments: Segment[];

    static fromJSON(json) {
        const segs = [];
        json.segments.forEach(element => {
            segs.push(Segment.fromJSON(element));
        });
        const campus = new Campus(json._id, json.name, json.isLunch, json.isThuiswerk, segs);
        return campus;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            isLunch: this._isLunch,
            isThuiswerk: this._isThuiswerk,
            segments: this._segments
        };
    }

    constructor(id: string, name: string, isLunch: boolean, isThuiswerk: boolean, segments: Segment[]) {
        this._id = id;
        this._name = name;
        this._isLunch = isLunch;
        this._isThuiswerk = isThuiswerk;
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

    set segments(segments) {
        this._segments = segments;
    }

    get isLunch() {
        return this._isLunch;
    }

    set isLunch(isLunch) {
        this._isLunch = isLunch;
    }

    get isThuiswerk() {
        return this._isThuiswerk;
    }

    set isThuiswerk(isThuiswerk) {
        this._isThuiswerk = isThuiswerk;
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
