const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        lowercase: true,
        unique: true,
        match: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Invalid email'],
        minLength: [10, 'Email should be at least 10 characters']
    },
    password: {
        required: true,
        match: [/^[a-zA-Z0-9]+$/, 'Password should be alphanumeric'],
        minLength: [6, 'Password needs to be longer'],
        type: String
    },
});

userSchema.pre('save', async function() {
    
    const hash = await bcrypt.hash(this.password, 11);

    this.password = hash;
});

userSchema.virtual('rePassword')
.set(function(value) {

    if (value !== this.password) {
        throw new mongoose.MongooseError('Password missmatch!');
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;