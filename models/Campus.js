let mongoose = require('mongoose')

let CampusSchema = new mongoose.Schema({
    name: String,
    segments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Segment'
        },
    ]
});

mongoose.model('Campus', CampusSchema);