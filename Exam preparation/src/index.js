const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const { authMiddleware } = require('./middlewares/authMiddleware');

const routes = require('./routes');

const app = express();

app.use(express.static(path.resolve('src/public')));
app.use(express.urlencoded({ extended: false }));
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.resolve('src/views'));

app.use(authMiddleware);
app.use(routes);


mongoose.connect('mongodb://localhost:27017/course-book');

mongoose.connection.on('connected', () => console.log('DB is connected'));
mongoose.connection.on('disconnected', () => console.log('DB is disconnected'));
mongoose.connection.on('error', (err) => console.log(err));

app.listen(3000, () => console.log('Server is listening on port: http://localhost:3000'));