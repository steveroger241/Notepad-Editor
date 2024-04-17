const express = require('express');
const app = express();
const mongoose = require('./config/db.js');
const cors = require('cors');
const noteroutes = require('./routes/noteRoutes.js');
const authroutes = require('./routes/authRoutes.js');
const compression = require('compression');
const path = require('path');


const dotenv = require('dotenv');
dotenv.config();


app.use(compression());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, './client/build')))


app.use('/notes', noteroutes);
app.use('/auth', authroutes);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});


app.listen(process.env.port);