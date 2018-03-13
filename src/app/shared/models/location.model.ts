export class Location {
    private _id: string;
    private _name: string;
    private _stickers: string[];

    static fromJSON(json) {
        if(json.id !== undefined) {
            json._id = json.id;
        }
        const location = new Location(json._id, json.name, json.stickers);
        return location;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            stickers: this._stickers,
        }
    }

    constructor(id: string, name: string, stickers: string[]) {
        this._id = id;
        this._name = name;
        this._stickers = stickers;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get stickers() {
        return this._stickers;
    }

    addSticker(sticker: string) {
        this._stickers.push(sticker);
    }

    removeSticker(sticker: string) {
        const index = this._stickers.indexOf(sticker);
        if(index !== -1)  {
            this._stickers.splice(index, 1);
        }
    }

}