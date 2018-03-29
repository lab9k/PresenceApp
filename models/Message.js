let mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
    _id: String,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    subject: String,
    content: String,
    isRead: Boolean
});

mongoose.model('User', UserSchema);