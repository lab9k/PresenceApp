import { User } from './user.model';

export class Message {
    private _id: string;
    private _sender: {
        name: string,
        id: string
    };
    private _subject: string;
    private _content: string;
    private _isRead: boolean;

    static fromJSON(json) {
        let message;

        message = new Message(json._id, json.sender, json.subject, json.content, json.isRead);
        return message;
    }

    toJSON() {
        return {
            _id: this._id,
            sender: this._sender,
            subject: this._subject,
            content: this._content,
            isRead: this._isRead,
        };
    }


    constructor(id: string, sender: {name: string, id: string}, subject: string, content: string, isRead: boolean) {
        this._id = id;
        this._sender = sender;
        this._subject = subject;
        this._content = content;
        this._isRead = isRead;
    }

    get id() {
        return this._id;
    }

    get sender() {
        return this._sender;
    }

    get subject() {
        return this._subject;
    }

    get content() {
        return this._content;
    }

    get isRead() {
        return this._isRead;
    }

    set sender(sender) {
        this._sender = sender;
    }

    set subject(subject) {
        this._subject = subject;
    }

    set content(content) {
        this._content = content;
    }

    set isRead(isRead) {
        this._isRead = isRead;
    }

}
