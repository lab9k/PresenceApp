import { Message } from './message.model';

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
    private _messages: Message[];
    private _accountType;

    static fromJSON(json) {
        let user;
        if (json.name) {
            user = new User(json._id, json.name, json.checkin, json.picture, json.phoneid, json.role, json.messages, json.accountType);
        } else {
            user = new User(json._id, json._name, json._checkin, json._picture, json._phoneid, json._role, json._messages,
                json._accountType);
        }

            return user;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            checkin: this._checkin,
            picture: this._picture,
            phoneid: this._phoneid,
            role: this._role,
            messages: this._messages,
        };
    }

    constructor(id: string, name: string, checkin: {location: string; time: number; }, picture: string,
        phoneid: string, role: string, messages: Message[], accountType: string) {
        this._id = id;
        this._name = name;
        this._checkin = checkin;
        this._picture = picture;
        this._phoneid = phoneid;
        this._role = role;
        this._messages = messages;
        this._accountType = accountType;
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

    get messages() {
        return this._messages;
    }

    set messages(messages) {
        this._messages = messages;
    }

    get accountType() {
        return this._accountType;
    }

    set accountType(accountType) {
        this._accountType = accountType;
    }

    addMessage(message) {
        if (this._messages === undefined) {
            this._messages = [];
        }
        this._messages.push(message);
    }
}
