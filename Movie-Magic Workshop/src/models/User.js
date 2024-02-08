const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        lowercase: true
    },
    password: {
        required: true,
        type: String
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;