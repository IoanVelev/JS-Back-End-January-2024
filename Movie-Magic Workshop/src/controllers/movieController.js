const router = require('express').Router();

const movieService = require('../services/movieService');
const castService = require('../services/castService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUitls');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    const newMovie = {
        ...req.body,
        owner: req.user._id
    };

    try {
        await movieService.create(newMovie);
        res.redirect('/');
    } catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('create', { error: message, newMovie })
    }
});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    const isOwner = movie.owner == req.user?._id;

    movie.rating = new Array(Number(movie.rating)).fill(true);
    res.render('movie/details', { movie, isOwner});
});

router.get('/movies/:movieId/attach/cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    const casts = await castService.getAll().lean();

    res.render('movie/attach', { ...movie, casts });
});


router.post('/movies/:movieId/attach/cast', isAuth, async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/attach/cast`);
});

router.get('/movies/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    res.render('movies/edit', { movie });
});

router.post('/movies/:movieId/edit', isAuth, async (req, res) => {
    const editedMovie = req.body;
    const movieId = req.params.movieId;
    await movieService.edit(movieId, editedMovie);

    res.redirect(`/movies/${movieId}`);
});

router.get('/movies/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    await movieService.delete(movieId);

    res.redirect('/');
});

module.exports = router;