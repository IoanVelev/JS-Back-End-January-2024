const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number,
        min: 13,
        max: 90
    },
    born: {
        required: true,
        type: String
    },
    nameInMovie: {
        required: true,
        type: String
    },
    castImage: {
        required: true,
        type: String,
        validate: {
            validator(value){
               return /^https?:\/\//.test(value);
            },
            message: (props) => `${props.value} is invalid URL for the cast image`
        }
    },
});

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;