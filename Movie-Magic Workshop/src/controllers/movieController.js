const router = require('express').Router();

const movieService = require('../services/movieService');
const castService = require('../services/castService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const newMovie = req.body;

    try {
        await movieService.create(newMovie);
        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.redirect('/create')
    }
});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    const casts = await castService.getByIds(movie.casts).lean();

    movie.rating = new Array(Number(movie.rating)).fill(true);
    res.render('details', { movie, casts });
});

router.get('/movies/:movieId/attach/cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    const casts = await castService.getAll().lean();

    res.render('movie/attach', { ...movie, casts });
});


router.post('/movies/:movieId/attach/cast', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/attach/cast`);
});

router.get('/movies/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    console.log(movie);
    res.render('movies/edit', { movie });
}); 

module.exports = router;