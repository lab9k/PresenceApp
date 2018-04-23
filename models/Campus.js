let mongoose = require('mongoose')

let CampusSchema = new mongoose.Schema({
    name: String,
    isLunch: Boolean,
    isThuiswerk: Boolean,
    weight: Number,
    segments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Segment'
        },
    ]
});

mongoose.model('Campus', CampusSchema);