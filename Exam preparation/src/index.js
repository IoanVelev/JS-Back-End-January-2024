const express = require('express');
const mongoose = require('mongoose');
const configExpress = require('./config/configExpress');
const configHandlebars = require('./config/configHandlebars');

const routes = require('./routes');

const app = express();

configExpress(app);
configHandlebars(app);
app.use(routes);


mongoose.connect('mongodb://localhost:27017/course-book');

mongoose.connection.on('connected', () => console.log('DB is connected'));
mongoose.connection.on('disconnected', () => console.log('DB is disconnected'));
mongoose.connection.on('error', (err) => console.log(err));

app.listen(3000, () => console.log('Server is listening on port: http://localhost:3000'));