const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5
    },
    type: {
        type: String,
        required: true,
        minLength: 3
    },
    certificate: {
        type: String,
        required: true,
        minLength: 2
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    signUpList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: Date,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

courseSchema.pre('save', function() {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;