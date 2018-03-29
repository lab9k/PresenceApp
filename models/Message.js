let mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
    sender: {
        name: String,
        id: String
    },
    subject: String,
    content: String,
    isRead: Boolean
});

mongoose.model('Message', MessageSchema);