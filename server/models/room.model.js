const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const roomSchema = mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    name: { type: String, required: true },
    available: { type: Boolean },
    online_list: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

mongoose.model('Room', roomSchema);