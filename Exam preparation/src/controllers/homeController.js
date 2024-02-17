const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const courseService = require('../services/courseService');
const userService = require('../services/userService');

router.get('/', async (req, res) => {
    const latestCourses = await courseService.getLatest().lean();

    res.render('home', { courses: latestCourses });
});

router.get('/user/profile', isAuth, async (req, res) => {
    const profileDetails = await userService.getUser(req.user._id).lean();
    const creatorCourses = await courseService.getCreatorCourses(req.user._id).lean();
    const signedUpCourses = await courseService.getUserSignedUpCourses(req.user._id).lean();
    console.log(signedUpCourses);
    res.render('profile', { ...profileDetails, createdCourses: creatorCourses, signedUpCourses: signedUpCourses});
});

module.exports = router;