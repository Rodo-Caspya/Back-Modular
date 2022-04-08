//Required modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

//config file
var config = require('./config');

//routes files
const usersRouter = require('./routes/users');
const vacasRouter = require('./routes/vacas');
const helpRouter = require('./routes/help');

//mongo conection
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected correctly to mongodb');
}, (err) => { console.log(err); });

//App inicialization
var app = express();

//Module utilization
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

//routers
app.use('/users', usersRouter);
app.use('/vacas', vacasRouter);
app.use('/help', helpRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;