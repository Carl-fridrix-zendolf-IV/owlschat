const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const messageSchema = mongoose.Schema({
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now() },
    sender_name: String,
    sender_type: Boolean,
    sender_id: { type: Schema.Types.ObjectId },
    chat_id: { type: Schema.Types.ObjectId }
});

mongoose.model('Message', messageSchema);