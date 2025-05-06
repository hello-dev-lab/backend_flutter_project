const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const cors = require('cors')
app.use(cors())


app.use(bodyParser.json());

const port = process.env.PORT || 3000;

require ('./src/routes/user_route')(app);

app.listen(port,"192.168.69.246", () => {
    console.log(`Server is running on port ${port}`);
});