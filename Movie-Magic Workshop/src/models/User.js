const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        lowercase: true,
        unique: true
    },
    password: {
        required: true,
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