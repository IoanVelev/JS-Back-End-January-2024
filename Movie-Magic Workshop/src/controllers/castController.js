const router = require('express').Router();

const Cast = require('../services/castService');

router.get('/create', (req, res) => {
    res.render('cast/create');
});

router.post('/create', async (req, res) => {
    const castData = req.body;
    
    try {
        await Cast.create(castData);
        res.redirect('/');
    } catch (err) {
        res.redirect('/cast/create');
    }
});

module.exports = router;