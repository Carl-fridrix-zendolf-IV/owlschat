const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    login: { type: String, unique : true, required : true, dropDups: true },
    password: String,
    user_id: Number,
    registered_at: { type: Date, default: Date.now },
    anonymous: { type: Boolean, required: true }
});

mongoose.model('User', userSchema);
