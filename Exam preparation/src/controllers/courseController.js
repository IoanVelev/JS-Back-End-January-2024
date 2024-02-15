const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const courseService = require('../services/courseService');
const userService = require('../services/userService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/', async (req, res) => {
    const courses = await courseService.getAll().lean();
    res.render('courses/catalog', { courses });
});

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

router.get('/:courseId/details', async (req, res) => {
    const course = await courseService.getOne(req.params.courseId).lean();

    const owner = await userService.getUser(course.owner);

    res.render('courses/details', { ...course, owner: owner.email });
});

module.exports = router;