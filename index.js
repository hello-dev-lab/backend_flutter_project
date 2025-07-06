const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const cors = require('cors')
app.use(require('cors')());


app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const upload= require('./src/routes/upload.file.routes');
app.use('/upload', upload);


require ('./src/routes/user_route')(app);
require ('./src/routes/category_route')(app);
require ('./src/routes/product_route')(app);
require ('./src/routes/admin_route')(app);
require ('./src/routes/order_route')(app);
require ('./src/routes/orderDetail_route')(app);
require ('./src/routes/payment_route')(app);

const provinces = require('./src/routes/provinces');
app.use('/province', provinces);

const districts = require('./src/routes/districts');
app.use('/district', districts);


app.listen(port,"192.168.141.246", () => {
    console.log(`Server is running on port ${port}`);
});