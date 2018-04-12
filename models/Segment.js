let mongoose = require('mongoose')

let SegmentSchema = new mongoose.Schema({
    name: String,
    isVergadering: Boolean,
    locations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location'
        },
    ]
});

mongoose.model('Segment', SegmentSchema);