const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        minLength: [5, 'Movie name needs to be longer'],
        match: /^[a-zA-Z0-9]+$/
    },
    genre: { 
        required: true,
        type: String,
        minLength: [5, 'Movie name needs to be longer'],
        match: /^[a-zA-Z0-9]+$/,
    },
    director: { 
        required: true,
        type: String,
        minLength: [5, 'Movie name needs to be longer'],
        match: /^[a-zA-Z0-9]+$/
    },
    year: {
        required: true,
        type: Number,
        min: 1915,
        max: 2029,
    },
    rating: {
        required: true,
        type: Number,
        min: 1,
        max: 5
    },
    description: {
        required: true,
        type: String,
        maxLength: 1000
    },
    imageUrl: {
        required: true,
        type: String,
        match: /^https?:\/\//
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Movie = mongoose.model('Movie', movieSchema);


module.exports = Movie;