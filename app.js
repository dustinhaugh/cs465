var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
require("./app_api/database/db");  // Module 5

// set up routers below
var indexRouter = require('./app_server/routes/index');
var travelRouter = require('./app_server/routes/travel');
var usersRouter = require('./app_server/routes/users');
const apiRouter = require('./app_api/routes/index');  // Module 5 #FIXME

// DUSTIN HAUGH: I will inster app-server paths below



var app = express();

app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars partials (NPM, 2021, p. 1)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('./api', apiRouter);  // Module 5




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
