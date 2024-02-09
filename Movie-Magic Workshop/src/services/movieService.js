const Movie = require('../models/Movie');


exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId).populate('casts');

exports.create = (movieData) => Movie.create(movieData);

exports.search = (title, genre, year) => {
    let query = {};

    if (title) {
        query.title = new RegExp(title, 'i');
    }

    if (genre) {
        query.genre = new RegExp(genre, 'i');
    }

    if (year) {
        query.year = year;
    }

    return Movie.find(query);
}

exports.attach = async (movieId, castId) => {
    const movie = await this.getOne(movieId);
    let isAttached = false;

    movie.casts.forEach(cast => {
        if (cast._id == castId) {
            isAttached = true;
        }
    });

    if (isAttached === false) {
        return Movie.findByIdAndUpdate(movieId, {$push: { casts: castId }});
    }
}

exports.delete = (movieId) => Movie.findByIdAndDelete(movieId);