const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    genre: { 
        required: true,
        type: String,
    },
    director: { 
        required: true,
        type: String
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
    }]
});

const Movie = mongoose.model('Movie', movieSchema);


module.exports = Movie;