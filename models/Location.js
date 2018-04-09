let mongoose = require('mongoose')

let LocationSchema = new mongoose.Schema({
    name: String,
    stickers: [
        {
            type: String
        }
    ],
    doNotDisturb: Boolean,
});

mongoose.model('Location', LocationSchema);