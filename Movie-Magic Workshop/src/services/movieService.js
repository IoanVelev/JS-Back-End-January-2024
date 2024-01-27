const movies = [{
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
    movies.push(movieData);
}

