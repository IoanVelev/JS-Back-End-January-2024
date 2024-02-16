const courseService = require('../services/courseService');

exports.isOwner = async (req, res, next) => {
    const course = await courseService.getOne(req.params.courseId);

    if (req.user?._id != course?.owner) {
        return res.redirect('/');
    }

    next();
}