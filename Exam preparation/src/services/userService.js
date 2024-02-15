const User = require('../models/User');

exports.getUser = (userId) => User.findById(userId);