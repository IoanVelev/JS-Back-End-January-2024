const Course = require('../models/Course');
const User = require('../models/User');


exports.getLatest = () => Course.find().sort({ createdAt: -1}).limit(3);

exports.getAll = () => Course.find();

exports.getOne = (courseId) => Course.findById(courseId);

exports.getDetailedOne = (courseId) => this.getOne(courseId).populate('owner').populate('signUpList');

exports.getCreatorCourses = (userId) => Course.find({ owner: userId });

exports.getUserSignedUpCourses = (userId) => Course.find({ signUpList: { $in: userId }});

exports.create = async (userId, courseData) => {

    const createdCourse = await Course.create({
        owner: userId,
        ...courseData
    });

    await User.findByIdAndUpdate(userId, {'$push': { createdCourses: createdCourse._id }});

    return createdCourse;
}

exports.edit = (courseId, editedCourseData) => Course.findByIdAndUpdate(courseId, editedCourseData, { runValidators: true });
    
exports.signUp = async (courseId, userId) => {
    await Course.findByIdAndUpdate(courseId, {$push: { signUpList: userId }});
    await User.findByIdAndUpdate(userId, {$push: { signedUpCourses: courseId }});
}

exports.delete = (courseId) => Course.findByIdAndDelete(courseId);