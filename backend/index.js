const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectToMongo = require('./database/db')
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config({path: ".env.local"});
connectToMongo();
app.use(cors());
app.use(express.json());
app.use(cookieParser());



app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/order', require('./routes/order'));



app.listen(process.env.port, ()=>{
    console.log("http://localhost:5000");
})
