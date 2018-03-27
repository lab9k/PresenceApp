export class User {
    private _id: string;
    private _name: string;
    private _checkin: {
        location: string;
        time: number;
    };
    private _picture: string;
    private _phoneid: string;
    private _role: string;

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            checkin: this._checkin,
            picture: this._picture,
            phoneid: this._phoneid,
            role: this._role,
        }
    }

    static fromJSON(json) {
        let user;
        if(json.name)
            user = new User(json._id, json.name, json.checkin, json.picture, json.phoneid, json.role);
        else
            user = new User(json._id, json._name, json._checkin, json._picture, json._phoneid, json._role);
            return user;
    }
    constructor(id: string, name: string, checkin: {location: string;time: number;}, picture: string, phoneid: string, role:string) {
        this._id = id;
        this._name = name;
        this._checkin = checkin;
        this._picture = picture;
        this._phoneid = phoneid;
        this._role = role;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get checkin() {
        return this._checkin;
    }

    get picture() {
        return this._picture;
    }

    set checkin(checkin) {
        this._checkin = checkin;
    }

    get phoneid() {
        return this._phoneid;
    }

    set phoneid(phoneid) {
        this._phoneid = phoneid;
    }

    get role() {
        return this._role;
    }
}