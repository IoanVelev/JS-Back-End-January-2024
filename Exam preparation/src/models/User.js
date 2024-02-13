const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 13);
});


const User = mongoose.model('User', userSchema);

module.exports = User