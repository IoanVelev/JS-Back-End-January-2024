const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome back');
});



module.exports = router;