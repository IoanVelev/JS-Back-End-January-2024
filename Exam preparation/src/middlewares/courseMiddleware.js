const courseService = require('../services/courseService');

exports.isOwner = async (req, res, next) => {
    

    try {
        const course = await courseService.getOne(req.params.courseId);

        if (req.user?._id != course?.owner) {
            return res.redirect('/');
        }
    
        next(); 
    } catch (err) {
        res.render('404');
    }
}