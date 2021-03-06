export class Location {
    private _id: string;
    private _name: string;
    private _weight: number;
    private _stickers: string[];
    private _doNotDisturb: boolean;

    static fromJSON(json) {
        if (json.id !== undefined) {
            json._id = json.id;
        }
        const location = new Location(json._id, json.name, json.weight, json.stickers, json.doNotDisturb);
        return location;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            weight: this._weight,
            stickers: this._stickers,
            doNotDisturb: this._doNotDisturb
        };
    }

    constructor(id: string, name: string, weight: number, stickers: string[], doNotDisturb: boolean) {
        this._id = id;
        this._name = name;
        this._weight = weight;
        this._stickers = stickers;
        this._doNotDisturb = doNotDisturb;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }
    get stickers() {
        return this._stickers;
    }

    get doNotDisturb() {
        return this._doNotDisturb;
    }

    set doNotDisturb(doNotDisturb) {
        this._doNotDisturb = doNotDisturb;
    }

    get weight() {
        return this._weight;
    }

    set weight(weight) {
        this._weight = weight;
    }

    addSticker(sticker: string) {
        this._stickers.push(sticker);
    }

    removeSticker(sticker: string) {
        const index = this._stickers.indexOf(sticker);
        if (index !== -1)  {
            this._stickers.splice(index, 1);
        }
    }

}
