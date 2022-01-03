const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const connectToMongo = require('./database/db')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
dotenv.config({path: ".env.local"});
connectToMongo();
cloudinary.config({cloud_name: process.env.CLOUDINARY_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET})
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());



app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/order', require('./routes/order'));



app.listen(process.env.port, ()=>{
    console.log("http://localhost:5000");
})
