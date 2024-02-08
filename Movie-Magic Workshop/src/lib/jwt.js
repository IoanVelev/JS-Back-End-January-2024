const jwt = require('jsonwebtoken');

function sign(payload, secretKey, options = {}) {
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, options, (err, token) => {
            if (err) {
                return reject(err);
            }

            resolve(token);
        });
    });

    return promise
}

module.exports = {
    sign
}