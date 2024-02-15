const Course = require('../models/Course');
const User = require('../models/User');

exports.getAll = () => Course.find();

exports.getOne = (courseId) => Course.findById(courseId);

exports.getDetailedOne = (courseId) => this.getOne(courseId).populate('owner').populate('signUpList');

exports.create = async (userId, courseData) => {

    const createdCourse = await Course.create({
        owner: userId,
        ...courseData
    });

    await User.findByIdAndUpdate(userId, {'$push': { createdCourses: createdCourse._id }});

    return createdCourse;
}

exports.edit = (courseId, editedCourseData) => Course.findByIdAndUpdate(courseId, editedCourseData);
    

exports.signUp = async (courseId, userId) => {
    await Course.findByIdAndUpdate(courseId, {$push: { signUpList: userId }});
    await User.findByIdAndUpdate(userId, {$push: { signedUpCourses: courseId }});
}