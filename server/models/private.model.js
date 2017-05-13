const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// TODO: I separate private and room model for more modular code and for next updates separately
const privateChatSchema = mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

mongoose.model('Private', privateChatSchema);