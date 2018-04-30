import { Message } from './message.model';
import { Checkin } from './checkin.model';

export class User {
    private _id: string;
    private _name: string;
    private _checkin: Checkin;
    private _picture: string;
    private _phoneid: string;
    private _role: string;
    private _messages: Message[];
    private _accountType;
    private _birthday;
    private _visible: boolean;

    static fromJSON(json) {
        let user;
        let checkin;
        if (json.name) {
            if (json.checkin !== undefined && json.checkin !== null) {
                checkin = Checkin.fromJSON(json.checkin);
            }
            user = new User(json._id, json.name, checkin, json.picture, json.phoneid, json.role, json.messages, json.accountType
                , json.birthday);
        } else {
            if (json.checkin !== undefined) {
                checkin = Checkin.fromJSON(json._checkin);
            }
            user = new User(json._id, json._name, checkin, json._picture, json._phoneid, json._role, json._messages, json._accountType
                , json._birthday);
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
            accountType: this._accountType
        };
    }

    constructor(id: string, name: string, checkin: Checkin, picture: string,
        phoneid: string, role: string, messages: Message[], accountType: string, birthday: Number) {
        this._id = id;
        this._name = name;
        this._checkin = checkin;
        this._picture = picture;
        this._phoneid = phoneid;
        this._role = role;
        this._messages = messages;
        this._accountType = accountType;
        this._birthday = birthday;
        this._visible = true;
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

    get birthday() {
        return this._birthday;
    }

    set birthday(birthday) {
        this._birthday = birthday;
    }

    get visible() {
        return this._visible;
    }

    set visible(visible) {
        this._visible = visible;
    }

    addMessage(message) {
        if (this._messages === undefined) {
            this._messages = [];
        }
        this._messages.push(message);
    }
}
