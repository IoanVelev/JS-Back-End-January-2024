const express = require('express');
const path = require('path');

const routes = require('./routes');

const app = express();

app.use(express.static(path.resolve('src/public')));
app.use(express.urlencoded({ extended: false }));

app.use(routes);



app.listen(3000, () => console.log('Server is listening on port: http://localhost:3000'));