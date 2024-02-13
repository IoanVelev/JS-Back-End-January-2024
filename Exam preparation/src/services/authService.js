const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (userData) => {
    if (userData.password !== userData.rePassword) {
        throw new Error('Password missmatch');
    }

    const user = await User.findOne({ email: userData.email});
    
    if (user) {
        throw new Error('User already exists');
    }

    return User.create(userData);
}

exports.login = async ({ email, password}) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Email or password is invalid');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Email or password is invalid');
    }

}