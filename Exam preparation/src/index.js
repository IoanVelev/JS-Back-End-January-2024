const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send('Home page');
});


app.listen(3000, () => console.log('Server is listening on port: http://localhost:3000'));