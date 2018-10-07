// import necessary dep
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const logger = require('logger');

// import mongo db
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/teremfoosballdashboard")
        .then(() => console.log('teremfoosballdashboard connection successful'))
        .catch((err)=> console.error(err));

// create server application
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'../public_html')));

// loading routes
const clientAppRouter = require('./routes/index');
const matchesAPIRoutes = require('./routes/matches');
const playersAPIRoutes = require('./routes/players');

app.use('/api/matches',matchesAPIRoutes);
app.use('/api/players',playersAPIRoutes);
app.use('/api*',clientAppRouter);

module.exports = app;
