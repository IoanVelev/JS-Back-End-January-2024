const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const courseService = require('../services/courseService');
const userService = require('../services/userService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/', async (req, res) => {
    const courses = await courseService.getAll().lean();
    res.render('courses/catalog', { courses });
});

router.get('/:courseId/details', async (req, res) => {
    const course = await courseService.getDetailedOne(req.params.courseId).lean();

    const isOwner = req.user?._id == course.owner._id && course.owner._id;
    const signUpUsers = course.signUpList.map(user => user.username).join(', ');
    const isSigned = course.signUpList.some(user => user._id == req.user?._id);

    res.render('courses/details', { ...course, isOwner, signUpUsers, isSigned });
});

router.get('/:courseId/sign-up', async (req, res) => {
    
    await courseService.signUp(req.params.courseId, req.user._id);
    res.redirect(`/courses/${req.params.courseId}/details`);
})

router.get('/create', isAuth, (req, res) => {
    res.render('courses/create');
});

router.post('/create', isAuth, async (req, res) => {
    const courseData = req.body;

    try {
        await courseService.create(req.user._id, courseData);
        res.redirect('/courses');
    } catch (err) {
        res.render('courses/create', { ...courseData, error: getErrorMessage(err) });
    }

});


module.exports = router;