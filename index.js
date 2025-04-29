const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

require ('./src/routes/user_route')(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});