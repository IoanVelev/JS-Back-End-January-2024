const movies = [{
    _id: 1,
    title: 'Jungle Cruise',
    genre: 'Adventure',
    director: 'Spilberg',
    date: '2020',
    imageUrl: '/img/jungle-cruise.jpeg',
    rating: '5',
    description: 'cool movie'
}];


exports.getAll = () => {
return movies.slice();
}
exports.create = (movieData) => {
    movieData._id = movies[movies.length - 1]._id + 1;
    movies.push(movieData);
}

