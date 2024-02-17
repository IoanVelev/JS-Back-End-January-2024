const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { isOwner } = require('../middlewares/courseMiddleware');
const courseService = require('../services/courseService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/', async (req, res) => {
    const courses = await courseService.getAll().lean();
    res.render('courses/catalog', { courses });
});

router.get('/:courseId/details', async (req, res) => {
    const course = await courseService.getDetailedOne(req.params.courseId).lean();

    const isCourseOwner = req.user?._id == course.owner._id && course.owner._id;
    const signUpUsers = course.signUpList.map(user => user.username).join(', ');
    const isSigned = course.signUpList.some(user => user._id == req.user?._id);

    res.render('courses/details', { ...course, isCourseOwner, signUpUsers, isSigned });
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

router.get('/:courseId/edit', isOwner, async (req, res) => {
    const courseData = await courseService.getOne(req.params.courseId).lean();
    res.render('courses/edit', { ...courseData });
});

router.post('/:courseId/edit', isOwner, async (req, res) => {
    const editedCourseData = req.body;
    
    try {
        await courseService.edit(req.params.courseId, editedCourseData);

        res.redirect(`/courses/${req.params.courseId}/details`);
    } catch (err) {
        res.render('courses/edit', { ...editedCourseData, error: getErrorMessage(err) })
    }
});

router.get('/:courseId/delete', isOwner, async (req, res) => {
    await courseService.delete(req.params.courseId);

    res.redirect('/courses');
});


module.exports = router;