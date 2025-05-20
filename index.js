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

const upload= require('./src/routes/upload.file.routes');
app.use('/upload', upload);

require ('./src/routes/user_route')(app);
require ('./src/routes/category_route')(app);
require ('./src/routes/product_route')(app);

app.listen(port,"192.168.69.246", () => {
    console.log(`Server is running on port ${port}`);
});