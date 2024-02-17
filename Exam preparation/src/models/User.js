const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 2,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 10,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minLength: 4,
        required: [true, 'password is required']
    },
    createdCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }],
    signedUpCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }]
});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 13);
});


const User = mongoose.model('User', userSchema);

module.exports = User