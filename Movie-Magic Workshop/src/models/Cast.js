const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minLength: [5, 'Name should be at least 5 characters']
    },
    age: {
        required: true,
        type: Number,
        min: 1,
        max: 120
    },
    born: {
        required: true,
        type: String,
        match: /^[a-zA-Z0-9/s]+$/
    },
    nameInMovie: {
        required: true,
        type: String,
        match: /^[a-zA-Z0-9/s]+$/
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