let mongoose = require('mongoose')

let LocationSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    stickers: [
        {
            type: String
        }
    ],
    doNotDisturb: Boolean,
});

mongoose.model('Location', LocationSchema);